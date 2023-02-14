import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { updateAccount } from "../../features/account/accountSlice";
import { makeOrder, reset } from "../../features/order/orderSlice";
import { emptyCart } from "../../features/snacks/snackSlice";


export default function Confrim(){
    const order = useSelector(state => state.order)
    const snacks = useSelector(state => state.snacks)
    const user = useSelector(state => state.user)
    const account = useSelector(state => state.account)
    const dispatch = useDispatch()

    const [message, setmessage] = useState('');

    useEffect(() => {
        if (snacks.totalPrice > account.amount){
            setmessage("Account balance is not enough to make this order")
        }
        else{
            setmessage("")
        }
    }, [])

    async function submitOrder(){
        await snacks.cart.forEach(item => {
            dispatch(makeOrder({
                user_id: user.user.id,
                snack_id: item.id,
                quantity: item.quantity
            }))
        });

        let newAmount = account.amount - snacks.totalPrice

        await dispatch(updateAccount({
            user_id: user.user.id,
            amount: newAmount
        }))


        // setInterval(() => {
        //     setCount((currentCount) => currentCount - 1);
        // }, 1000);
        //   // when count is 0, navigate
        //   count === 0 && navigate("/dashboard");
        //   // clean up the interval
        // clearInterval(interval)
            // redirect("/dashboard")
    }

    if (order.orderSuccess) {
        const cleanUp1 = () => {
            dispatch(emptyCart())
        }
        const cleanUp2 = () => {
            dispatch(reset())
        }

        cleanUp1()
        cleanUp2()
        // return <Navigate replace={true} to="/dashboard" />
    }

    return (
        <>
            <div className="container mx-auto mb-12 flex justify-center items-center flex-col mt-20">
                <div className="card shadow-lg shadow-amber-400 w-fit p-5">

                {
                        !user.isLoggedIn && 
                        <>
                        <p className="my-6 text-amber-800 text-2xl text-center w-fit">Cannot proceed without logging in!</p>
                        <Link to="/login" className="btn text-center mb-4  text-amber-900 bg-amber-400 hover:bg-amber-700 hover:text-white btn-sm">Login</Link>
                        <Link to="/snacks" className="btn text-center text-amber-900 bg-amber-400 hover:bg-amber-700 hover:text-white btn-sm">Back to snacks</Link>
                        </>
                    }

                    {
                        user.isLoggedIn && message !== '' ? 
                        <>
                        <p className="my-6 text-amber-800 text-2xl text-center">Oops Sorry! {message}</p>
                        <Link to="/cart" className="btn text-center text-amber-900 bg-amber-400 hover:bg-amber-700 hover:text-white btn-sm">Edit Cart</Link>
                        </>
                        :
                        null
                    }

                    {
                        user.isLoggedIn && order.error && 
                        <>
                        <p className="my-6 text-amber-800 text-2xl text-center">Error! {order.error}</p>
                        <Link to="/snacks" className="btn text-center text-amber-900 bg-amber-400 hover:bg-amber-700 hover:text-white btn-sm">Back to snacks page</Link>
                        </>
                    }

                    {
                        user.isLoggedIn &&  !order.orderSuccess && !order.error && !order.loading && snacks.cart.length && !message &&
                        <>
                            <h1 className="text-center text-3xl font-bold text-amber-700 underline">CONFIRM YOUR ORDER</h1>
                            <p className="mt-4 text-amber-800 text-sm">By clicking confirm you agree to the price below being deducted from you account!</p>

                            <div className="flex justify-center mt-4">
                                <div>
                                    <div className="w-64 flex flex-row justify-between p-2">
                                        <h2 className="text-lg font-bold text-amber-800">Snacks:</h2>
                                        <h2 className="text-xl font-bold text-amber-800">{snacks.cart.length}</h2>
                                    </div>

                                    <hr className="border-b-2 border-amber-700 w-full" />

                                    <div className="w-72 flex flex-row justify-between p-2">
                                        <h2 className="text-3xl font-bold text-amber-900">Total</h2>
                                        <h2 className="text-3xl font-bold text-amber-900">KES {snacks.totalPrice}</h2>
                                    </div> 
                                </div>                       
                            </div>

                            <hr className="border-b-2 border-amber-700" />

                            <div className="flex justify-center">
                                <div className="flex flex-row justify-between mt-4">
                                    <Link to="/cart" className="btn bg-amber-900 btn-sm mx-2 hover:bg-amber-400 hover:text-amber-900" type="button">Edit Cart</Link>
                                    <button onClick={() => submitOrder()} className="btn bg-amber-500 btn-sm mx-2 hover:bg-amber-200 hover:text-amber-900" type="button">Confirm</button>
                                </div>
                            </div>
                        </>
                    }
                    {
                        user.isLoggedIn && order.payed && snacks.totalPrice === 0 ?
                        
                        <>
                        <div className="flex justify-center flex-col mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-52 h-52 text-amber-600 text-center ml-auto mr-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-4 text-amber-800 text-2xl text-center">Your order has been made. Thank you for shopping with us</p>
                            <Link to="/snacks" className="btn text-center text-amber-900 bg-amber-400 hover:bg-amber-700 hover:text-white btn-sm mt-5">Back to snacks page</Link>
                        </div>
                        </>
                        :
                        null
               
                    }

                </div>
            </div>
        </>
    )
}