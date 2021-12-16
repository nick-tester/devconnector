import { Link } from "react-router-dom";

const Navbar = () => {
    const isAuthenticated = localStorage.getItem("token") ? true : false;

    const logoutHandler = () => {
        localStorage.removeItem("token");
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