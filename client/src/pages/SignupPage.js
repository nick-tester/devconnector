import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAlert } from "../assets/reducers/alert_actions";
import { register } from "../assets/reducers/auth_actions";

const SignupPage = () => {
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    const dispatch = useDispatch();

    const onChangeHandler = e => setformData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = e => {
        e.preventDefault();

        if (password !== password2 || !password || !password2) {
            dispatch(setAlert("Please revise passwords", "danger"));
        } else {
            dispatch(register({ name, email, password }));
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChangeHandler} />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        minLength="6"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        minLength="6"
                        onChange={onChangeHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/auth/signin">Sign In</Link>
            </p>
        </>
    )
}

export default SignupPage;