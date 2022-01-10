import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt, FaUser, FaPen, FaSignInAlt } from "react-icons/fa";

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
                <li>
                    <Link to="/profiles">
                        dev<span className="hide-sm">eloper</span>s
                    </Link></li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/auth/dashboard">
                                <span className="hide-lg" title="user"><FaUser /></span>
                                <span className="hide-sm"> {user ? user.name : "user"}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/signin" onClick={logoutHandler}>
                                <span className="hide-lg" title="logout"><FaSignOutAlt /></span>
                                <span className="hide-sm"> logout</span>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/auth/signup">
                                <span className="hide-lg" title="register"><FaPen /></span>
                                <span className="hide-sm"> signup</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/signin">
                                <span className="hide-lg" title="login"><FaSignInAlt /></span>
                                <span className="hide-sm"> signin</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;