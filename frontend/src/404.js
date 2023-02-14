import { Link } from "react-router-dom";

export default function ErrorPage(){
    return (
        <>
            <div className="container mx-auto">
                <div className="text-center mt-36">
                    <h2 className="font-bold text-5xl text-amber-700">404! ERROR</h2>
                    <p className="text-xl font-semibold text-amber-900">OOOPS! The requested page was not found</p>
                    <Link className="btn bg-amber-600 text-white hover:bg-amber-800 my-3" to="/snacks">Back to safety</Link>
                </div>
            </div>
        </>
    )
}