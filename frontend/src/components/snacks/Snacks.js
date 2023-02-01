import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchSnacks, removeFromCart } from "../../features/snacks/snackSlice";
import Checkout from "../checkout/Checkout";

export default function Snacks(){

    const snacks = useSelector(state => state.snacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSnacks())
    }, [])

    const sweetSnacks = snacks.snacks.filter(snack => snack.snack_type === "sweet")
    const hotSnacks = snacks.snacks.filter(snack => snack.snack_type === "hot")
    const saltySnacks = snacks.snacks.filter(snack => snack.snack_type === "salty")
    return(
        <>
    <div className="container-fluid mx-10 mt-6 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
                <h2 className="text-3xl text-amber-800 font-extrabold mb-7 w-fit"><span className="border-b-4 border-amber-700">Sweet</span> Snacks</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {
                        sweetSnacks.map(snack => {
                            return (
                                <div key={snack.id} className="w-full max-w-sm bg-white">
                                    <div className="flex justify-center items-center">
                                        <img className="border-4 rounded-lg border-amber-500 w-full h-48 object-cover" src={snack.image} alt="product" />
                                    </div>

                                    <div className="px-5 p-5 rounded-lg border border-amber-500">
                                        
                                        <div className="flex items-center justify-between pb-3">
                                            <h5 className="text-xl text-amber-900 font-bold tracking-tight truncate">
                                            {snack.name}
                                            </h5>
                                            <span className="text-xl w-32 font-bold text-amber-900 dark:text-white">KES {snack.price}</span>
                                        </div>

                                        <div className="flex flex-row justify-between items-center">
                                            <Link to={"/snacks/" + snack.id + "/" + snack.name} className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">View</Link>

                                            {
                                                snacks.cart.find(item => item.id === snack.id) ?
                                                    <button onClick={() => dispatch(removeFromCart(snack.id))} className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Remove from cart</button>
                                                        :
                                                    <button onClick={() => dispatch(addToCart(snack)) } className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</button>
                                            }
                                            
                                        </div>  
                                    </div>
                                </div>
                            )
                        })
                    } 
                </div>

                <h2 className="text-3xl text-amber-800 font-extrabold mb-7 mt-9 w-fit"><span className="border-b-4 border-amber-700">Salty</span> Snacks</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {
                        saltySnacks.map(snack => {
                            return (
                                <div key={snack.id} className="w-full max-w-sm bg-white">
                                    <div className="flex justify-center items-center">
                                        <img className="border-4 rounded-lg border-amber-500 w-full h-48 object-cover" src={snack.image} alt="product" />
                                    </div>

                                    <div className="px-5 p-5 rounded-lg border border-amber-500">
                                        
                                        <div className="flex items-center justify-between pb-3">
                                            <h5 className="text-xl text-amber-900 font-bold tracking-tight truncate">
                                            {snack.name}
                                            </h5>
                                            <span className="text-xl w-32 font-bold text-amber-900 dark:text-white">KES {snack.price}</span>
                                        </div>

                                        <div className="flex flex-row justify-between items-center">
                                            <Link to={"/snacks/" + snack.id + "/" + snack.name} className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">View</Link>

                                            {
                                                snacks.cart.find(item => item.id === snack.id) ?
                                                    <button onClick={() => dispatch(removeFromCart(snack.id))} className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Remove from cart</button>
                                                        :
                                                    <button onClick={() => dispatch(addToCart(snack)) } className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</button>
                                            }
                                            
                                        </div>  
                                    </div>
                                </div>
                            )
                        })
                    } 
                </div>

                <h2 className="text-3xl text-amber-800 font-extrabold mb-7 w-fit mt-9"><span className="border-b-4 border-amber-700">Hot</span> Snacks</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {
                        hotSnacks.map(snack => {
                            return (
                                <div key={snack.id} className="w-full max-w-sm bg-white">
                                    <div className="flex justify-center items-center">
                                        <img className="border-4 rounded-lg border-amber-500 w-full h-48 object-cover" src={snack.image} alt="product" />
                                    </div>

                                    <div className="px-5 p-5 rounded-lg border border-amber-500">
                                        
                                        <div className="flex items-center justify-between pb-3">
                                            <h5 className="text-xl text-amber-900 font-bold tracking-tight truncate">
                                            {snack.name}
                                            </h5>
                                            <span className="text-xl w-32 font-bold text-amber-900 dark:text-white">KES {snack.price}</span>
                                        </div>

                                        <div className="flex flex-row justify-between items-center">
                                            <Link to={"/snacks/" + snack.id + "/" + snack.name} className="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">View</Link>

                                            {
                                                snacks.cart.find(item => item.id === snack.id) ?
                                                    <button onClick={() => dispatch(removeFromCart(snack.id))} className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Remove from cart</button>
                                                        :
                                                    <button onClick={() => dispatch(addToCart(snack)) } className="text-amber-900 bg-amber-300 hover:bg-amber-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</button>
                                            }
                                            
                                        </div>  
                                    </div>
                                </div>
                            )
                        })
                    } 
                </div>


            </div>

            <div className="hidden md:inline md:fixed md:right-20 md:w-96">
                <h3 className="text-2xl text-amber-900 border-b-4 font-semibold border-amber-400 text-left w-fit">Cart Item(s)</h3>
                <Checkout />
            </div>
            
        </div>


    </div>
        </>
    )
}