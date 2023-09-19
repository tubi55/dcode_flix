import useAuth from '@/hooks/useAuth';
import { modalState, movieState } from '@/recoil/globalAtom';
import { Movie } from '@/types';
import { baseURL } from '@/url';
import Image from 'next/image';
import { useRef } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

interface Props {
	original: Movie;
}

function Banner({ original }: Props) {
	const { InitialLoading } = useAuth();
	const loading = useRef<HTMLDivElement>(null);
	const [ShowModal, setShowModal] = useRecoilState(modalState);
	const [MovieInfo, setMovieInfo] = useRecoilState(movieState);

	return (
		<section className='h-[50vh] px-4 pb-20 pt-40  flex flex-col space-y-4 py-16 md:space-y-8 lg:space-y-12 lg:px-16 md:h-[60vh] lg:h-[85vh] lg:justify-end overflow-hidden relative'>
			{InitialLoading.current ? (
				<div className='loading'></div>
			) : (
				<>
					<div className='absolute top-0 left-0 z-[1] w-full h-full opacity-80'>
						<Image
							//서버에서 random으로 전달한 데이터를 바로 활용
							src={`${baseURL}original${original.backdrop_path}`}
							alt={`${original.title || original.name}`}
							fill
							priority
							className='object-cover'
							onLoadingComplete={() => loading.current?.remove()}
						/>
						<div className='absolute bottom-0 left-0 w-full h-full bg-gradient1'></div>
						<div ref={loading} className='loading'></div>
					</div>
					<h1 className='relative z-[3] text-2xl font-bold drop-shadow md:text-4xl lg:text-7xl'>
						{original.title || original.name}
					</h1>
					<p className='relative z-[3] text-xs max-w-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>{original.overview}</p>

					<nav className='relative z-[3] flex space-x-3'>
						<button
							className='bannerButton bg-white text-black'
							onClick={() => {
								setShowModal(true);
								setMovieInfo(original);
							}}
						>
							<FaPlay /> Play
						</button>
						<button className='bannerButton bg-[gray] text-white'>
							<FaInfoCircle /> More Info
						</button>
					</nav>
				</>
			)}
		</section>
	);
}

export default Banner;
