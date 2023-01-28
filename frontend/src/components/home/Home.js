import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/users/userSlice';

const schema = yup
	.object({
		username: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

export default function Home() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => login(data);

	function login(data) {
		dispatch(loginUser(data));
	}

	if (user.isLoggedIn) {
		return <Navigate replace={true} to='/dashboard' />;
	}

	return (
		<>
			<div className='container mx-auto mt-16'>
				<div className='hero h-auto bg-base-200 p-10'>
					<div className='hero-content flex-col lg:flex-row-reverse'>
						<div className='text-center lg:text-left text-amber-800'>
							<h1 className='text-6xl font-bold'>Your Home For Snacks!</h1>
							<p className='py-6 font-semibold'>
								Login to you account to get the best experience while you browse
								and order mouth watering, eye cooling snack.
							</p>
						</div>
						<div className='card flex-shrink-0 w-full max-w-sm shadow-md shadow-amber-200 bg-base-100'>
							<div className='card-body'>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='form-control'>
										{user.error ? (
											<span className='text-red-500 my-5'>
												Error: {user.error}!
											</span>
										) : (
											false
										)}
										<label className='label'>
											<span className='label-text'>Username</span>
										</label>
										<input
											{...register('username')}
											type='text'
											placeholder='eg @dee'
											className='input border-2 border-amber-400  focus:outline-0 focus:ring-amber-700 focus:border-amber-500'
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Password</span>
										</label>
										<input
											{...register('password')}
											type='password'
											placeholder='password'
											className='input border-2 border-amber-400 focus:outline-0 focus:ring-amber-700 focus:border-amber-500'
											required
										/>
										<label className='label'>
											<Link
												to='/register'
												className='label-text-alt link link-hover text-amber-800 text-sm'
											>
												Don't have an account? Click here to register
											</Link>
										</label>
									</div>
									<div className='form-control mt-6'>
										<button
											type='submit'
											className='btn bg-amber-500 hover:bg-amber-700'
										>
											{user.loading ? (
												<div role='status'>
													<svg
														aria-hidden='true'
														className='inline w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-yellow-400'
														viewBox='0 0 100 101'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
															fill='currentColor'
														/>
														<path
															d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
															fill='currentFill'
														/>
													</svg>
													<span className='sr-only'>Loading...</span>
												</div>
											) : (
												'Login'
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}