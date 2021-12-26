import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../assets/reducers/auth_actions";

const Navbar = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(state => state.auth);

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
                <li><Link to="/auth/signup">Register</Link></li>
                {isAuthenticated ? (
                    <li><Link to="/auth/signin" onClick={logoutHandler}>Logout</Link></li>
                ) : (
                    <li><Link to="/auth/signin">Login</Link></li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;