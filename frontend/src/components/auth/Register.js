import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, registerUser } from '../../features/users/userSlice';
import { useState } from 'react';

const schema = yup
	.object({
		// username: yup.string().required(),
		// email: yup.string().required(),
		// avatar: yup.string().required(),
		// password: yup.string().required(),
		// confirm_password: yup.string().required(),
	})
	.required();

export default function Register() {
	const [image, setImage] = useState({});

	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (userData) => registerAccount(userData);

	const handleChange = e => {
		e.persist();
		setImage(e.target.files[0]);
	};

	const registerAccount = async userData => {
		const data = new FormData();
		data.append('avatar', image);
		data.append('username', userData.username);
		data.append('email', userData.email);
		data.append('password', userData.password);
		data.append('password_confirmation', userData.password_confirmation);

		const userInfo = await dispatch(registerUser(data))

		await dispatch(createAccount({
			user_id: userInfo.payload.id,
			amount: 1500
		}))
	};

	if (user.isLoggedIn) {
		return <Navigate replace={true} to="/dashboard" />
	}

	return (
		<>
			<div className='container mx-auto flex items-center justify-center'>
				<div className='card flex-shrink-0 w-full shadow-md shadow-amber-200 bg-base-100 p-8 mt-10'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h1 className='mb-5 text-4xl font-bold text-amber-700'>
							<span className='border-b-4 border-amber-400 text-amber-900'>Hello</span> Esteemed
							Cutomer
						</h1>

						{user.error ? (
							<span className='text-red-500 my-5'>Error: {user.error}! Try a different username or email.</span>
						) : (
							false
						)}

						<div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2'>
							<div>
								<div className='mb-6'>
									<label
										htmlFor='username'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Username
									</label>
									<input
										{...register('username')}
										type='text'
										id='username'
										className='input border-2 focus:outline-none border-amber-400 focus:ring-amber-700 focus:border-amber-500 w-full md:w-5/6'
										placeholder='john_doe'
										
									/>
								</div>

								<div className='mb-6'>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Email
									</label>
									<input
										{...register('email')}
										type='email'
										id='email'
										className='input border-2 focus:outline-none border-amber-400 focus:ring-amber-700 focus:border-amber-500 w-full md:w-5/6'
										placeholder='john_doe@user.com'
										
									/>
								</div>

								<div className='mb-6'>
									<label
										htmlFor='avatar'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Upload profile image
									</label>
									<input onChange={handleChange}
										type='file' name='avatar' 
										className='file-input file-input-bordered border-2 file-input-warning max-w-xs w-full md:w-5/6'
									/>
								</div>
							</div>

							<div>
								<div className='mb-6'>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Password
									</label>
									<input
										type='password'
										{...register('password')}
										id='password'
										className='input border-2 focus:outline-none border-amber-400 focus:ring-amber-700 focus:border-amber-500 w-full md:w-5/6'
										
									/>
								</div>

								<div className='mb-6'>
									<label
										htmlFor='password_confirmation'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Confirm password
									</label>
									<input
										type='password'
										{...register('password_confirmation')}
										id='password_confirmation'
										className='input border-2 focus:outline-none border-amber-400 focus:ring-amber-700 focus:border-amber-500 w-full md:w-5/6'
										
									/>
								</div>
							</div>
						</div>

						<div className='form-control mt-3'>
							<button type='submit' className='btn bg-amber-500 hover:bg-amber-700 md:w-80 w-full'>
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
									'Register'
								)}
							</button>
						</div>


						<label className='label'>
							<Link
								to='/'
								className='label-text-alt link link-hover text-amber-800 text-sm'
							>
								Have an account? Click here to login
							</Link>
						</label>
					</form>
				</div>
			</div>
		</>
	);
}
