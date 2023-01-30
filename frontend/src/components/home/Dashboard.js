import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextTransition, { presets } from 'react-text-transition';
import { Link } from 'react-router-dom';
import { getUserOrders, reset } from '../../features/order/orderSlice';
import Payment from '../payment/Payment';
import { cleanUpAccount, getAccount } from '../../features/account/accountSlice';

export default function Dashboard() {
	const user = useSelector((state) => state.user);
	const orders = useSelector((state) => state.order);
	const account = useSelector((state) => state.account);
	const dispatch = useDispatch();
	const [load, setload] = useState(true);

	let ordersArrayCopy;
	let sortOrders;
	let recentOrder;

	if (orders.userOrders) {
		if (orders.userOrders.length) {
			ordersArrayCopy = [...orders.userOrders];
		}
	}

	if (ordersArrayCopy) {
		sortOrders = ordersArrayCopy.sort((itemA, itemB) => {
			return itemB.updated_at.localeCompare(itemA.updated_at);
		});
		recentOrder = sortOrders[0].quantity * sortOrders[0].snack.price;
	}

	function getOrderSubtotal(price, quantity) {
		if (!quantity) return true;
		return price * quantity;
	}

	useEffect(() => {
		dispatch(
			getUserOrders({
				user_id: user.user.id,
			}),
        dispatch(getAccount(user.user.id))
		);
		setTimeout(() => {
			setload((load) => false);
		}, 2000);
		const cleanUp = () => dispatch(reset())
		const cleanUp2 = () => dispatch(cleanUpAccount())
        cleanUp()
        cleanUp2()
	}, []);

	if (load) {
		return (
			<>
				<div className='flex justify-center mt-20'>
					<h2 className='text-2xl text-amber-800'>
						Loading Dashboard{' '}
						<span className='text-amber-900 text-5xl animate-pulse font-extrabold'>
							.....
						</span>
					</h2>
				</div>
			</>
		);
	}

	return (
		<>
			<div className='container mx-auto mb-14'>
				<div className='card p-24 border-b-8 border-r-4 shadow-md shadow-amber-500 border-amber-800'>
					<h1 className='text-8xl text-amber-800'>
						<span className='uppercase '>
							{user.user.username}'<span className='lowercase'>s</span>{' '}
							Dashboard
						</span>
					</h1>
				</div>

				<div className=''>
					<h2 className='text-3xl text-amber-900 border-b-4 border-amber-400 my-6 w-fit'>
						Account Summary
					</h2>

					<div className='grid grid-cols-2 gap-4'>
						<div className='stats text-center'>
							<div className='stat'>
								<div className='stat-title text-2xl text-amber-900 font-bold'>
									Total Orders
								</div>
								<div className='stat-value text-6xl text-amber-800 font-extrabold'>
									{orders.userOrders.length}
								</div>
								<div className='stat-desc text-2xl text-amber-900'>
									Joined on,{' '}
									<span className='underline'>
										{moment(user.user.created_at).format('MMMM Do YYYY')}
									</span>{' '}
								</div>
							</div>
						</div>

						<div className='stats bg-amber-500 text-primary-content shadow-lg shadow-amber-400'>
							<div className='stat'>
								<div className='text-white'>Account balance</div>
								<div className='stat-value'>KES {account.amount}</div>
								<div className='stat-actions'>
									{
                                        account.amount < 1000 &&
                                        <label htmlFor='my-modal-4' className='btn btn-sm btn-outline text-white hover:bg-white font-bold hover:text-amber-800'>
										Add funds
                                        </label>
                                    }
								</div>
							</div>

							<div className='stat'>
								<div className='text-white'>Most recent order</div>
								<div className='stat-value'>
									KES {recentOrder ? recentOrder : 0}
								</div>
								<div className='stat-actions'>
									{recentOrder && (
										<Link to="/orders/id/edit" className='btn btn-sm btn-outline text-white hover:bg-white font-bold hover:text-amber-800'>
											Edit Order
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className='upcoming-events mt-3'>
						<h5 className='text-3xl text-amber-900 border-b-4 border-amber-400 my-6 w-fit mb-6'>
							Order History
						</h5>
						<div className='border-2 border-amber-500 p-3 rounded-2xl w-full'>
							<ol className='flex flex-row justify-around items-center border-l border-gray-200 dark:border-gray-700'>
								{sortOrders ? (
									sortOrders.slice(0, 3).map((order) => {
										return (
											<li key={order.id} className=''>
												{/* <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div> */}
												<time className='mb-1 text-sm font-bold leading-none text-amber-400 '>
													{moment(order.snack.updated_at).format(
														'MMMM Do YYYY, h:mm a',
													)}
												</time>
												<h3 className='text-lg font-bold text-amber-900'>
													{order.snack.name}
												</h3>
												<p className='mb-4 text-base font-bold text-amber-900'>
													Total KES{' '}
													{getOrderSubtotal(order.snack.price, order.quantity)}
												</p>
											</li>
										);
									})
								) : (
									<h1 className='text-xl text-amber-900 font-semibold'>
										Your order history will appear here!
									</h1>
								)}
							</ol>
							{sortOrders && sortOrders.length > 3 ? (
								<Link
									className='text-amber-700 hover:underline mx-28'
									to="/orders/history"
								>
									View more
								</Link>
							) : null}
						</div>
					</div>
				</div>

				<input type='checkbox' id='my-modal-4' className='modal-toggle' />
				<label htmlFor='my-modal-4' className='modal cursor-pointer'>
					<label className='modal-box relative w-fit' htmlFor=''>
                        <div className=''>
                            <Payment />
                        </div>
					</label>
				</label>
			</div>
		</>
	);
}
