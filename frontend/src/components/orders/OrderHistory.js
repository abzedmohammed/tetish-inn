import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export default function OrderHistory() {
	const orders = useSelector((state) => state.order);

    function getTotal(price, quantity) {
        return price * quantity
    }

    const itemsPerPage = 4

    const items = orders.userOrders

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
      };

	return (
		<>
			<div className='container mx-auto mt-8 mb-16'>
				<h2 className='text-3xl border-b-4 border-amber-500 my-5 w-fit text-amber-900'>
					My Order History
				</h2>
				<div className='overflow-x-auto w-full'>
					<table className='table w-full'>
						<thead>
							<tr>
								<th className='bg-amber-300 text-amber-900 font-extrabold text-lg rounded-l-lg'>
									Items
								</th>
								<th className='bg-amber-300 text-amber-900 font-extrabold text-lg'>
									Quantity
								</th>
								<th className='bg-amber-300 text-amber-900 font-extrabold text-lg'>
									Price
								</th>
								<th className='bg-amber-300 text-amber-900 font-extrabold text-lg rounded-r-lg'>
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{
                                currentItems.map(order => {
                                    return (
                                        <tr key={order.id}>
                                            <td>
                                                <div className='flex items-center space-x-3'>
                                                    <div className='avatar'>
                                                        <div className='mask rounded-full w-14 h-14'>
                                                            <img
                                                                src={order.snack.image}
                                                                alt='Product'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='font-bold text-lg text-amber-900'>
                                                            {order.snack.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='font-bold text-xl text-amber-900'>{order.quantity}</td>
                                            <td className='font-bold text-lg text-amber-900'>KES {getTotal(order.snack.price, order.quantity)}</td>
                                            <th className='font-bold text-lg text-amber-900'>
                                            {order.updated_at}
                                            </th>
                                        </tr>
                                    )
                                })
                            }
						</tbody>
                        <ReactPaginate
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="Previous"
                            pageClassName="text-lg font-semibold text-amber-700"
                            pageLinkClassName="text-2xl mx-2"
                            previousClassName="p-2 rounded-lg bg-amber-500 w-fit text-center font-semibold mx-5 hover:bg-amber-700 hover:text-white"
                            previousLinkClassName="hover:underline"
                            nextClassName="p-2 rounded-lg bg-amber-500 w-fit text-center font-semibold mx-5 hover:bg-amber-700 hover:text-white"
                            nextLinkClassName="hover:underline"
                            breakLabel="..."
                            breakClassName="text-3xl text-amber-700"
                            breakLinkClassName="font-extrabold hover:underline"
                            containerClassName="flex flex-row items-center w-full py-0 px-2 mt-8"
                            activeClassName="bg-amber-900 text-amber-100 rounded-lg"
                            renderOnZeroPageCount={null}
                        />
					</table>
				</div>
			</div>
		</>
	);
}
