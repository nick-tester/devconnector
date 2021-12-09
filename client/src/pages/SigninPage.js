import { Link } from "react-router-dom";

const SigninPage = () => {
    const alert = false;
    return (
        <>
            {alert && (
                <div className="alert alert-danger">
                    Invalid credentials
                </div>
            )}
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" action="dashboard.html">
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/auth/signup">Sign Up</Link>
            </p>
        </>
    )
}

export default SigninPage;