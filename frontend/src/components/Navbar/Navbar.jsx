import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    const logout = () => {
        window.open(`/auth/logout`, "_self");
    };
    return (
        <>  <nav>

            <div className=" navbar bg-base-100 h-[40px]">
                <div className="flex-1">
                        <Link className="btn btn-ghost normal-case text-2xl cursor-pointer font-bold link" to="/">
                            CodeWithMe
                        </Link>
                </div>


                <div className="flex-none">
                        <Link className="btn btn-ghost  cursor-pointer font-bold  " to="/ide">
                           Online IDE
                        </Link>
                    {user.displayName ? (<ul className="flex space-x-4 items-center">
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
