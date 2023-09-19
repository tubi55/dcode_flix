import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
	authDomain: 'dcode2307.firebaseapp.com',
	projectId: 'dcode2307',
	storageBucket: 'dcode2307.appspot.com',
	messagingSenderId: '111290350000',
	appId: '1:111290350000:web:4c91b4bbc0224108287e75',
};
//firebase로 구동되는 app이 없으면 아직 인증처리 되지 않았으므로
//인증처리가 되지 않은 상태에서만 초기화 (불필요한 인증객체 초기화방지)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();

export default app;
export { auth };
