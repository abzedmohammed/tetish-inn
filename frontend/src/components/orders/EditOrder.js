import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { updateAccount } from "../../features/account/accountSlice";
import { decrementQuantity, editOrder, getSingleOrder, incrementQuantity, reset } from "../../features/order/orderSlice";

export default function EditOrder(){
    const order = useSelector(state => state.order)
    const account = useSelector(state => state.account)
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    let ordersArrayCopy = [...order.userOrders];
    const sortedOrders = ordersArrayCopy.sort((itemA, itemB) => {
        return itemB.updated_at.localeCompare(itemA.updated_at);
    });
    let recentOrder = sortedOrders[0]

    const [message, setmessage] = useState('');
    const [editedPrice, seteditedPrice] = useState(null)

    useEffect(() => {
        if (editedPrice > account.amount){
            setmessage("Account balance is not enough to change this order.")
        }
        else{
            setmessage("")
        }

        dispatch(getSingleOrder(recentOrder.id))

        seteditedPrice(getPrice(recentOrder.snack.price, recentOrder.quantity))
        
    }, [recentOrder.quantity, editedPrice])

    function getPrice(price, quantity) {
        return price * quantity
    }

    async function submitReOrder(){
        let priceDiff;
        let newAmount;

        if (order.total > editedPrice) {
            priceDiff = order.total - editedPrice
            newAmount = account.amount + priceDiff

            await dispatch(editOrder({
                id: recentOrder.id,
                quantity: recentOrder.quantity
            }))

            await dispatch(updateAccount({
            user_id: user.id,
            amount: newAmount
            }))
        }
        else if(order.total < editedPrice){
            priceDiff = editedPrice - order.total
            newAmount = account.amount - priceDiff
            
            await dispatch(editOrder({
                id: recentOrder.id,
                quantity: recentOrder.quantity
            }))

            await dispatch(updateAccount({
            user_id: user.id,
            amount: newAmount
            }))
        }

    }

    if (order.orderSuccess) {
        return <Navigate replace={true} to="/dashboard" />
    }

    return(
        <>
            <div className="container mx-auto p-5">
            <h2 className="text-3xl border-b-4 border-amber-500 mt-5 w-fit text-amber-800">Edit Order</h2>
            <div className="mt-10 p-4">
                {
                    order.error &&
                    <div className="border-2 border-amber-600 p-4 flex justify-center flex-col rounded-lg">
                        <p className="text-amber-900 text-xl font-semibold">Oops! Sorry, we could not complete your request. Please try again later!</p>
                        <Link to="/dashboard" className="text-lg btn btn-sm text-amber-900 bg-amber-400 w-fit mt-4 hover:bg-amber-800 hover:text-white">Back to dashboard</Link>
                    </div>
                }

                {
                    message !== '' &&
                    <div className="border-2 border-amber-600 p-4 flex justify-center flex-col rounded-lg">
                        <p className="text-amber-900 text-xl font-semibold">Sorry! {message}</p>
                        <Link to="/dashboard" className="text-lg btn btn-sm text-amber-900 bg-amber-400 w-fit mt-4 hover:bg-amber-800 hover:text-white">Back to dashboard</Link>
                    </div>
                }
                    {
                        !message && !order.error &&

                    <div className="flex flex-row">
                    <div className="border-4 border-amber-600 rounded-lg w-9/12 h-96">
                        <img className="w-full h-[376px] object-fill" src={recentOrder.snack.image} alt="product" />
                    </div>

                    <div className="mx-10 text-left">
                        <h1 className="text-2xl text-amber-700 font-semibold mb-4 border-b-4 border-amber-700">{recentOrder.snack.name}</h1>
                        <h2 className="text-3xl text-amber-800 font-bold mb-4">KES {editedPrice}</h2>

                        <hr className="border border-amber-400" />

                        <div className="flex flex-row items-center mt-6">
                            <button onClick={() => dispatch(decrementQuantity(recentOrder))} className="btn btn-sm border border-amber-500 bg-transparent text-amber-900 text-lg hover:bg-amber-500 hover:text-white" type="button">-</button>

                            <span className="px-2 font-bold text-xl">{recentOrder.quantity}</span>

                            <button onClick={() => dispatch(incrementQuantity(recentOrder))} className="btn btn-sm border border-amber-800 bg-transparent text-amber-800 text-lg hover:bg-amber-800 hover:text-white" type="button">+</button>

                        </div>

                        <br />
                        <div className="card-actions mt-4">

                            <button className="text-white bg-amber-800 hover:border-2 hover:border-amber-800 hover:text-amber-900 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete order</button>
                                :
                            <button onClick={submitReOrder} className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">Resubmit order</button>
                        </div>
                    </div>
                </div>
                    }
                </div>
            </div>
        </>
    )
}