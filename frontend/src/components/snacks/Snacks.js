import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchSnacks, removeFromCart } from "../../features/snacks/snackSlice";
import Checkout from "../checkout/Checkout";

export default function Snacks(){

    const [laodingText, setlaodingText] = useState('Fetching ingredients from the server...')
    const snacks = useSelector(state => state.snacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSnacks())
        setTimeout(() => {
            setlaodingText("Prepairing your snacks...")
        }, 5000);

        setTimeout(() => {
            setlaodingText("Preparations are done! Adding the extra taste...")
        }, 10000);

        setTimeout(() => {
            setlaodingText("Packaging................................")
        }, 15000);

        setTimeout(() => {
            setlaodingText("Almost there... Please be patient")
        }, 20000);

    }, [])

    const sweetSnacks = snacks.snacks.filter(snack => snack.snack_type === "sweet")
    const hotSnacks = snacks.snacks.filter(snack => snack.snack_type === "hot")
    const saltySnacks = snacks.snacks.filter(snack => snack.snack_type === "salty")
    return(
        <>
    <div className="container-fluid mx-10 mt-6 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            
            {
                snacks.loading ?
                
                    <div className="flex flex-col items-center justify-center mt-32">
                        <div role="status">
                            <svg aria-hidden="true" className="w-24 h-24 text-amber-400 animate-spin fill-amber-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="text-amber-900 text-lg font-semibold">{laodingText}</p>
                        
                    </div>
                :

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

            }

            <div className="hidden xl:inline xl:fixed xl:right-20 xl:w-96">
                <h3 className="text-2xl text-amber-900 border-b-4 font-semibold border-amber-400 text-left w-fit">Cart Item(s)</h3>
                <Checkout />
            </div>
            
        </div>


    </div>
        </>
    )
}