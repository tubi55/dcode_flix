import { Movie } from '@/types';
import List from './List';

interface Props {
	title: string;
	movies: Movie[];
}

function Row({ title, movies }: Props) {
	//전달받은 타이틀값에서 _가 붙어있는 property명은 대문자로 시작하고 빈칸으로 문자열 치환
	title = title
		.split('_')
		.map((text) => text.charAt(0).toUpperCase() + text.slice(1))
		.join(' ');

	return (
		<article className='pl-4 pb-[10px] mb-4  md:pb-[30px] lg:pl-12'>
			<h2 className='w-56 cursor-pointer text-base font-semibold text-[#e5e5e5] transition duration-200 md:text-xl lg:text-2xl hover:text-white '>
				{title}
			</h2>

			<div className='relative group'>
				<List movies={movies} />
			</div>
		</article>
	);
}

export default Row;
