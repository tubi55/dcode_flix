import Head from 'next/head';
import Image from 'next/image';
import logo from '@/public/img/logo.svg';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';

interface Inputs {
	email: string;
	password: string;
}
function Login() {
	const { signIn, signUp } = useAuth();
	const [Login, setLogin] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const join: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (Login) {
			await signIn(email, password);
		} else {
			await signUp(email, password);
		}
	};

	return (
		<main className='relative flex w-full h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<title>Nextflix Member</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Image src='https://rb.gy/p2hphi' fill priority className='z-10 opacity-60 hidden md:inline object-cover' alt='login' />

			<Image
				width={150}
				height={150}
				src={logo}
				alt='logo'
				className='absolute left-4 top-4 cursor-pointer md:left-10 md:top-6 z-10'
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			/>

			<form
				onSubmit={handleSubmit(join)}
				className='relative z-50 mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
			>
				<h1 className='text-4xl font-semibold'>Sign In</h1>

				<div className='space-y-4'>
					<input
						type='text'
						placeholder='Email'
						className='input'
						{...register('email', {
							required: true,
							pattern: /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.([a-zA-Z]){2,4}$/,
							//시작조건으로는 모든숫자,대소문자포함가능,중간에 -_허용 / 중간에 @무조건포함 /앞의 동일조건처리 / 중간에 무조건 .포함 / 문자값만 2개이상이고 4글자 넘지 않아야 함
						})}
					/>

					{errors.email && <span>Please enter a valid Email</span>}
					<input
						type='password'
						placeholder='Password'
						className='input'
						{...register('password', {
							required: true,
							pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&])(?=.*[0-9]).{5,20}$/,
							//모든 대소문자를 무조건포함하고 그앞에 어떤값도 가능 / 원하는 특수문자 그룹지정해서 무조건포함하고 그앞에 어떤값도 가능 / 모든 숫자 무조건 포함하고 그앞에 어떤값도 가능 그뒤에도 . 어떤값 들어올수 있음 범위는 최소 5글자이상 20글자는 넘지 않아야 함
						})}
					/>
					{errors.password && <span>Please enter a valid Password</span>}
				</div>

				<button className='w-full rounded bg-[#e40914] py-3 font-semibold' onClick={() => setLogin(true)}>
					Sign In
				</button>

				<div className='text-[gray]'>
					New to Nextflix?
					<button className='text-white ml-4 hover:underline' onClick={() => setLogin(false)}>
						Sign up Now
					</button>
				</div>
			</form>
		</main>
	);
}

export default Login;
