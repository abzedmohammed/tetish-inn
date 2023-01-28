import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { makeOrder, reset } from "../../features/order/orderSlice";
import { emptyCart } from "../../features/snacks/snackSlice";


export default function Confrim(){
    const order = useSelector(state => state.order)
    const cart = useSelector(state => state.snacks.cart)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const [count, setCount] = useState(5);

    async function submitOrder(){
        await cart.forEach(item => {
            dispatch(makeOrder({
                user_id: user.id,
                snack_id: item.id,
                quantity: item.quantity
            }))
        });
        dispatch(emptyCart())

        setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000);
        //   // when count is 0, navigate
        //   count === 0 && navigate("/dashboard");
        //   // clean up the interval
        // clearInterval(interval)
            // redirect("/dashboard")
    }

    if (count === 0) {
        dispatch(reset())
        return <Navigate replace={true} to="/dashboard" />
    }

    return (
        <>
            <div className="container mx-auto mb-12 flex justify-center items-center flex-col mt-20">
                <div className="card shadow-lg shadow-amber-400 w-fit p-5">
                    {
                        order.orderSuccess ?
                        <div className="flex justify-center flex-col mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-52 h-52 text-amber-600 text-center ml-auto mr-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-4 text-amber-800 text-2xl text-center">Your order has been made. Thank you for shopping with us</p>
                            <p className="mt-4 text-amber-800 text-md text-center">Redirecting to your dashboard in {count >= 0 ? count : 0}</p>
                        </div>
                        :
                        <>
                            <h1 className="text-center text-3xl font-bold text-amber-700 underline">CONFIRM YOUR ORDER</h1>
                            <p className="mt-4 text-amber-800 text-sm">By clicking confirm you agree to the price below being deducted from you account!</p>

                            <div className="flex justify-center mt-4">
                                <div>
                                    <div className="w-64 flex flex-row justify-between p-2">
                                        <h2 className="text-lg font-bold text-amber-800">Snacks:</h2>
                                        <h2 className="text-xl font-bold text-amber-800">5</h2>
                                    </div>

                                    <hr className="border-b-2 border-amber-700 w-full" />

                                    <div className="w-72 flex flex-row justify-between p-2">
                                        <h2 className="text-3xl font-bold text-amber-900">Total</h2>
                                        <h2 className="text-3xl font-bold text-amber-900">KES 5000</h2>
                                    </div> 
                                </div>                       
                            </div>

                            <hr className="border-b-2 border-amber-700" />

                            <div className="flex justify-center">
                                <div className="flex flex-row justify-between mt-4">
                                <Link to="/cart" className="btn bg-amber-900 btn-sm mx-2 hover:bg-amber-400 hover:text-amber-900" type="button">Edit Cart</Link>
                                    <button onClick={submitOrder} className="btn bg-amber-500 btn-sm mx-2 hover:bg-amber-200 hover:text-amber-900" type="button">Confirm</button>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    )
}