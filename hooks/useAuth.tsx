import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { auth } from '../firebase';

interface Iloading {
	current: boolean | null;
}

interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	InitialLoading: Iloading;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	InitialLoading: { current: true },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const InitialLoading = useRef<boolean>(true);
	const isMask = useRef<boolean>(false);
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const router = useRouter();

	//라우터 이동시 라우터가 너무 빨리 이동이 되서 abort fetch router 에러문구 뜨는 경우
	//원인: 데이터가 fetching중이거나, 컴포넌트의 추가적인 데이터들이 fully loaded 않았을때 라우터 변경될떄
	//해결방법1 : router.push('/', undefined, {shallow: true}) :라우트 이동시 fetching기능 무시하고 router이동만 처리 (실제 컴포넌트 변경시)
	//해결방법2 : 커스텀훅을 생성하고 그 안쪽에서 router.onChangeComplete 이벤트를 활용해서 기존 라우터 변경이 끝난이후에 router.push호출 (다른 hook이나 핸들러함수 안쪽에서 호출 불가)
	//지금 상황에서는 위의방법 모두 적용불가 (전체 컴포넌트를 감싸고 있는 root 컴포넌트이기 때문에 unmount가 불가능하기 때문)
	//해결방법3 : useAuth훅안에서 유저정보값이 변경될때마다 setTimeout으로 강제 debouncing적용
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo(user);
				//인증정보가 바뀌는 순간 로딩화면을 바로 보여줌
				isMask.current = true;
				//0.2초동안 debouncing처리완료후 로딩화면 없애고 라우터 이동
				setTimeout(() => {
					isMask.current = false;
					router.push('/');
				}, 200);
			} else {
				setUserInfo(null);
				isMask.current = true;
				//메인에서 로그인페이지 넘어갈때 0.4초동안 push가 중복실행되지 못하도록 debouncing적용
				setTimeout(() => {
					isMask.current = false;
					router.push('/login');
				}, 400);
			}
			setTimeout(() => (InitialLoading.current = false), 0);
		});
	}, []);

	const signUp = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
			})
			.catch((err) => alert(err.message));
	};

	const signIn = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then((userInfo) => {
				setUserInfo(userInfo.user);
			})
			.catch((err) => alert(err.message));
	};

	const logout = async () => {
		signOut(auth)
			.then(() => {
				setUserInfo(null);
			})
			.catch((err) => alert(err.message));
	};

	const memoedContext = useMemo(() => ({ UserInfo, signIn, signUp, logout, InitialLoading }), [UserInfo, InitialLoading]);
	return (
		<AuthContext.Provider value={memoedContext}>
			{!InitialLoading.current ? children : <div className='loading'></div>}
			{/* isMask값이 true면 마스크화면 추가 false면 제거 */}
			{isMask.current ? (
				<div className='w-full h-screen fixed top-0 left-0 z-50 bg-black/90'>
					<div className='loading'></div>
				</div>
			) : null}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
