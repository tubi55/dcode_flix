import { modalState, movieState } from '@/recoil/globalAtom';
import Image from 'next/image';
import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseURL } from '@/url';

function Modal() {
	const ref = useRef<any>(null);
	const [ShowModal, setShowModal] = useRecoilState(modalState);
	const Movie = useRecoilValue(movieState);

	return (
		<aside className='fixed w-full h-[100vh] top-0 left-0 z-50 bg-[rgba(0,0,0,.9)] p-10 flex items-center justify-center'>
			<article className='w-[100%] h-[70%] flex justify-between flex-wrap'>
				{/* picBox */}
				<div className='relative w-[100%] h-[60%] sm:w-[40%] sm:h-[100%] overflow-hidden'>
					<Image
						src={`${baseURL}w780/${Movie?.poster_path}`}
						alt={`${Movie?.title}`}
						fill
						className='object-contain'
						onLoadingComplete={() => ref.current.remove()}
					/>
					{/* image loading bar */}
					<div className='loading' ref={ref}></div>
				</div>

				{/* txtBox */}
				<div className='w-[100%] h-[40%] sm:w-[55%] sm:h-[100%] flex flex-wrap content-center'>
					<h2 className='w-[100%] text-[30px] text-white mb-[20px]'>{Movie?.title}</h2>
					<p className='w-[100%] text-[12px] text-[#aaa]'>{Movie?.overview}</p>
				</div>
			</article>
			<span
				className='absolute top-10 right-10 text-[16px] text-white cursor-pointer font-bold'
				onClick={() => setShowModal(false)}
			>
				close
			</span>
		</aside>
	);
}

export default Modal;
