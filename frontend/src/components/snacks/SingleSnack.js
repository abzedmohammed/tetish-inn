import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, fetchSnackById, removeFromCart } from "../../features/snacks/snackSlice";

export default function SingleSnack(){
    const {id} = useParams()
    const snacks = useSelector(state => state.snacks)
    const snack = snacks.singleSnack
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSnackById(id))
    }, [])
    return(
        <>
            <div className="container mx-auto mt-3">
            <div className="flex flex-row items-center">
             <Link to="/snacks">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 my-4 text-amber-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
            </Link> <Link className="text-amber-800 mx-2 font-bold" to="/snacks">Back to snacks</Link>
            </div>

                <div className="flex flex-col md:flex-row">
                    <div className="border-4 border-amber-600 rounded-lg w-full md:w-9/12 h-96">
                        <img className="w-full h-[376px] object-fill" src={snack.image} alt="product" />
                    </div>

                    <div className="mx-10 text-left xs:mt-3">
                        <h1 className="text-2xl text-amber-700 font-semibold mb-4 border-b-4 border-amber-700">{snack.name}</h1>
                        <h2 className="text-3xl text-amber-800 font-bold mb-4">KES {snack.price}</h2>

                        <h2 className="text-xl text-amber-600 border-b-2 border-amber-400">Flavours</h2>
                        <ul className="p-3">
                            <li className="text-lg font-semibold text-amber-900">{snack.flavors}</li>
                            <li className="text-lg font-semibold text-amber-900">Herbanero</li>
                            <li className="text-lg font-semibold text-amber-900">Honey</li>
                            <li className="text-lg font-semibold text-amber-900">Mayonnaise</li>                           
                        </ul>
                        <hr className="border border-amber-400" />

                        <br />
                        <div className="card-actions">
                        {
                            snacks.cart.find(item => item.id === snack.id) ?
                                <button onClick={() => dispatch(removeFromCart(snack.id))} className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Remove from cart</button>
                                    :
                                <button onClick={() => dispatch(addToCart(snack)) } className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</button>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}