import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    const logout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
    };
    return (
        <>

            <nav>
                <div className="">
                    <div className="flex justify-between h-16 px-10 shadow items-center">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">
                                <Link className="link" to="/">
                                    CodeWithMe
                                </Link></h1>
                        </div>
                        {user ? (<ul className="flex space-x-4 items-center">
                            <li className="text-gray-800 text-lg">{user.displayName}</li>
                            <li onClick={logout} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">Logout</li>
                        </ul>) : (<Link className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" to="login">
                            Login
                        </Link>)}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
