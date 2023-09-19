import { atom } from 'recoil';
import { Movie } from '@/types';

export const modalState = atom<boolean>({
	//atom 객체의 key값이 고유값으로 인지되야되는데
	//next에서 pre-render가 미리 되기 때문에
	//서버에서 한번, hydrate때 또 한번 (Next에서만 발생하는 이슈)
	//컴포넌트가 구동될때마다 고유값을 뒤에 추가로 붙여서 키값중복오류 해결
	key: `modalState${performance.now()}`,
	default: false,
});

export const movieState = atom<Movie | null>({
	key: `movieState${performance.now()}`,
	default: null,
});
