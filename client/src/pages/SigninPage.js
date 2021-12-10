import { useState } from "react";
import { Link } from "react-router-dom";

const SigninPage = () => {
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = e => {
        e.preventDefault();

        if (!password || !email) {
            setAlert(true);

            setTimeout(() => {
                setAlert(false)
            }, 3000);
        } else {
            console.log(JSON.stringify(formData));
        }
    }

    return (
        <>
            {alert && (
                <div className="alert alert-danger">
                    Invalid credentials
                </div>
            )}
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/auth/signup">Sign Up</Link>
            </p>
        </>
    )
}

export default SigninPage;