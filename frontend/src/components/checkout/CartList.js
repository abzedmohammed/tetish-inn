import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getTotal } from "../../features/snacks/snackSlice";

export default function CartList(){
    const snacks = useSelector(state => state.snacks)  
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTotal())
    }, [snacks.cart])
    return(
        <>
            <div className="container mx-auto my-6 w-4/5">
                <div className="">
                    <div className="flex justify-center">
                        <h3 className="text-3xl text-amber-900 border-b-4 font-bold mb-7 border-amber-400 text-center w-fit">Total Orders</h3>
                    </div>
                        {
                            snacks.cart.map(item => {
                                return <Cart key={item.id} id={item.id} subtotal={item.subtotal} name={item.name} price={item.price} image={item.image} quantity={item.quantity} />
                            })
                        }
                </div>

                <div className="flex flex-row justify-between items-center border-spacing-2 bg-amber-200 p-4 rounded-lg w-1/3">
                    <h2 className="text-xl text-amber-900 font-medium">TOTAL</h2>
                    <h2 className="text-xl text-amber-900 font-bold">KES {snacks.totalPrice}</h2>
                </div>
            

                {
                    snacks.cart.length >= 1 ?
                    <div className="mt-2">
                        <Link className="btn bg-amber-700 text-white btn-sm w-1/3" type="button" to="/orders/confirm">Proceed to checkout</Link>
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}