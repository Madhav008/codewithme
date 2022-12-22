import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    const logout = () => {
        window.open("http://192.168.1.123:5000/auth/logout", "_self");
    };
    return (
        <>  <nav>

            <div className=" navbar bg-base-100 h-[40px]">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-2xl cursor-pointer font-bold">
                        <Link className="link" to="/">
                            CodeWithMe
                        </Link>
                    </a>
                </div>
                <div className="flex-none">
                    {user ? (<ul className="flex space-x-4 items-center">
                        <li className=" text-lg">{user.displayName}</li>
                        <li onClick={logout} className="btn btn-primary	btn-sm ">Logout</li>
                    </ul>) : (<Link className="btn btn-primary btn-sm	" to="login">
                        Login
                    </Link>)}
                </div>
            </div>

        </nav>
        </>
    );
};

export default Navbar;
