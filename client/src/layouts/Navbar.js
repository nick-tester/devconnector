import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt, FaUser, FaSign, FaSignInAlt } from "react-icons/fa";

import { logout } from "../assets/reducers/auth_actions";

const Navbar = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector(state => state.auth);

    function logoutHandler() {
        dispatch(logout());
    }

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles">Developers</Link></li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/auth/dashboard">
                                <span className="hide-sm"></span>{user ? user.name : "User"}
                                <FaUser />
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/signin" onClick={logoutHandler}>
                                <span className="hide-sm">Logout</span>
                                <FaSignOutAlt />
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/auth/signup">
                                <span className="hide-sm">Register</span>
                                <FaSign />
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/signin">
                                <span className="hide-sm">Login</span>
                                <FaSignInAlt />
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;