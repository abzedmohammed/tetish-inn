import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/snack.jpg";
import { logout } from "../../features/users/userSlice";

export default function Nav(){
    const user = useSelector(state => state.user)
    const items = useSelector(state => state.snacks)
    const dispatch = useDispatch()
    return(
        <>
        <div className="navbar bg-base-100 px-9 border-b rounded-sm border-amber-500">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost active:bg-amber-200 focus:bg-amber-300 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 active:bg-amber-200 focus:bg-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow shadow-amber-400 bg-base-100 rounded-box w-52">
                    <li><Link className="active:bg-amber-200 focus:bg-amber-200" to="/">Home</Link></li>
                    <li><Link className="active:bg-amber-200 focus:bg-amber-200" to="/snacks">Snacks</Link></li>
                    {
                    user.user.is_admin ? 
                    <li><Link className="active:bg-amber-200 focus:bg-amber-200" to="/admin">Admin Dashboard</Link></li>
                    :
                    null
                }
                </ul>
                </div>
                <Link to="/" className="flex flex-row items-center text-xl">
                    <img src={logo} className="w-24 h-24 rounded-full" alt="logo" />
                    <span className="text-amber-800 text-3xl font-extrabold border-b-4 border-amber-600 hidden md:block">TETISH-INN</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex flex-row items-center">
                <li><Link 
                className="mx-2 p-3 rounded-lg font-bold text-lg text-amber-900 hover:bg-amber-200" to="/">Home
                </Link></li>
                <li><Link className="mx-2 p-3 rounded-lg font-bold text-lg text-amber-900 hover:bg-amber-200" to="/snacks">Snacks</Link></li>
                {
                    user.user.is_admin ? 
                    <li><Link className="mx-2 p-3 rounded-lg font-bold text-lg text-amber-900 hover:bg-amber-200" to="/admin">Admin Dashboard</Link></li>
                    :
                    null
                }
                </ul>
            </div>
            <div className="navbar-end">
                
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-amber-200">
                            <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-md indicator-item bg-amber-300 text-amber-900 font-extrabold">{items.cart.length}</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 border-4 border-amber-700 shadow">
                            <div className="card-body">
                            <span className="font-bold text-lg text-amber-900">{items.cart.length} Item(s)</span>
                            <span className="text-amber-600 font-bold">Total: KES {items.totalPrice}</span>
                            <div className="card-actions">
                                <Link to="/cart" className="btn bg-amber-700 btn-md px-6 hover:bg-amber-300 hover:text-amber-900 hover:font-bold">View cart</Link>
                            </div>
                            </div>
                        </div>
                        </div>

                        { user.isLoggedIn ? 
                        
                        <div className="dropdown dropdown-end mx-2">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-amber-200">
                            <div className="w-12 rounded-full">
                            <img src={user.user.avatar} alt="avatar" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 border-4 border-amber-700 rounded-box w-52">
                            <li>
                            <Link to="/dashboard" className="justify-between font-semibold text-amber-900 hover:bg-amber-200 hover:font-extrabold">
                                Dashboard
                            </Link>
                            </li>
                            <li><a className="font-semibold text-amber-900 hover:bg-amber-200 hover:font-extrabold" onClick={() => dispatch(logout())}>Logout</a></li>
                        </ul>
                    </div>
                    : 
                    <div className="hidden lg:dropdown lg:dropdown-end lg:mx-2">
                    <ul className="flex flex-row items-center">
                        <li><Link 
                        className="mx-2 p-3 rounded-lg font-bold text-lg text-amber-900 hover:bg-amber-200" to="/login">Login
                        </Link></li>
                        <li><Link className="mx-2 p-3 rounded-lg font-bold text-lg text-amber-900 hover:bg-amber-200" to="/register">Register</Link></li>

                    </ul>
                    </div>
                }
                </div>
            
            </div>
            </div>
        </>
    )
}