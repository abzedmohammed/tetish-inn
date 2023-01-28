import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getTotal } from "../../features/snacks/snackSlice";

export default function Checkout(){

    const snacks = useSelector(state => state.snacks) 

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTotal())
    }, [snacks.cart])

    return (
        <>
            <div className="w-auto">
                
                <div className="p-4">
                    <div className="flex flex-col justify-center">
                    {
                            snacks.cart.slice(0, 3).map(item => {
                                return <Cart key={item.id} id={item.id} name={item.name} price={item.price} subtotal={item.subtotal} image={item.image} quantity={item.quantity} />
                            })
                        }
                    </div>

                        {
                            window.location.pathname === "/snacks" && snacks.cart.length > 3 ?
                            <Link className="text-amber-700 underline hover:no-underline" to="/cart">View more</Link>
                            :
                            null
                        }
                </div>

                <div className="flex flex-row justify-between items-center border-spacing-2 bg-amber-200 p-4 rounded-lg w-full">
                    <h2 className="text-xl text-amber-900 font-medium">TOTAL</h2>
                    <h2 className="text-xl text-amber-900 font-bold">KES {snacks.totalPrice}</h2>
                </div>
                
                {
                    window.location.pathname === "/snacks" && snacks.cart.length >= 1 ?
                    <div className="mt-2">
                        <Link className="btn bg-amber-700 text-white btn-sm w-full" type="button" to="/orders/confirm">Proceed to checkout</Link>
                    </div>
                    :
                    null
                }
                
            </div>
        </>
    )
}