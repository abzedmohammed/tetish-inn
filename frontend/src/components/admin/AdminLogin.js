import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdminUser } from '../../features/users/userSlice';

const schema = yup
	.object({
		username: yup.string().required(),
	})
	.required();

export default function AdminLogin({ getUser }) {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => logAdmin(data);

	function logAdmin(data) {
		dispatch(loginAdminUser(data));
	}

	if (user.isLoggedIn) {
		return <Navigate to='/admin' />;
	}

	return (
		<>
			<div className='container mx-auto flex items-center justify-center mt-6'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1 className='my-8 text-4xl font-bold border-b-4 border-amber-400 text-amber-600'>
						Admin login
					</h1>
					{user.error ? (
						<span className='text-red-500 my-5'>Error: {user.error}!</span>
					) : (
						false
					)}
					<div className='mb-6'>
						<label
							for='username'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							username
						</label>
						<input
							{...register('username')}
							type='text'
							id='username'
							className='input border-2 border-amber-400  focus:outline-0 focus:ring-amber-700 focus:border-amber-500 w-80'
							placeholder='john_doe'
							required
						/>
					</div>
					<div className='mb-6'>
						<label
							for='password'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							password
						</label>
						<input
							type='password'
							{...register('password')}
							id='password'
							className='input border-2 border-amber-400  focus:outline-0 focus:ring-amber-700 focus:border-amber-500 w-80'
							required
						/>
					</div>
					<button
						type='submit'
						className='btn bg-amber-500 hover:bg-amber-700 w-80'
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
				</form>
			</div>
		</>
	);
}
