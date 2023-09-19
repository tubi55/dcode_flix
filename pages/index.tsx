import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import requests from '@/utils/request';
import { Movie } from '@/types';
import Banner from '@/components/Banner';
import Row from '@/components/Row';
import Modal from '@/components/Modal';
import { useRecoilValue } from 'recoil';
import { modalState } from '@/recoil/globalAtom';

interface Props {
	original: Movie[];
	top: Movie[];
	sf: Movie[];
	drama: Movie[];
	horror: Movie[];
	comedy: Movie[];
	action: Movie[];
	random: Movie;
}

const Home: NextPage<Props> = (props: Props) => {
	const showModal = useRecoilValue(modalState);
	return (
		<div className='relatvie h-screen '>
			<Head>
				<title>NEXTFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='relative'>
				<Banner original={props.random} />

				<section>
					{Object.values(props)
						.filter((data) => data.length)
						.map((category, idx) => (
							<Row key={idx} movies={category} title={Object.keys(props)[idx]} />
						))}
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const [original, top, science_fiction, drama, TV_movies, comedy, western] = await Promise.all([
		fetch(requests.original).then((res) => res.json()),
		fetch(requests.top).then((res) => res.json()),
		fetch(requests.science_fiction).then((res) => res.json()),
		fetch(requests.drama).then((res) => res.json()),
		fetch(requests.TV_movies).then((res) => res.json()),
		fetch(requests.comedy).then((res) => res.json()),
		fetch(requests.western).then((res) => res.json()),
	]);

	const randomOrigin = original.results[Math.floor(Math.random() * original.results.length)];

	return {
		props: {
			original: original.results,
			top_rated: top.results,
			science_fiction: science_fiction.results,
			drama: drama.results,
			TV_movies: TV_movies.results,
			comedy: comedy.results,
			western: western.results,
			random: randomOrigin,
		},
	};
};
