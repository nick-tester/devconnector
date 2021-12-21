import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAlert } from "../assets/reducers/alert_actions";

const SigninPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { email, password } = formData;

    const dispatch = useDispatch();

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!password || !email) {
            dispatch(setAlert("Invalid credentials", "danger"));
        } else {
            console.log(formData);
        }
    };

    return (
        <>
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