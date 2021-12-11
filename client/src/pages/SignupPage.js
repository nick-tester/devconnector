import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:5000/api/auth/register";

const SignupPage = () => {
    const [alert, setAlert] = useState({ type: "danger", show: false, msg: "" });
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = formData;

    const onChangeHandler = e => setformData({ ...formData, [e.target.name]: e.target.value });

    const handleAlert = (type = "danger", show = false, msg = "") => {
        setAlert({ type, show, msg });

        setTimeout(() => {
            setAlert({ type: "danger", show: false, msg: "" });
            setformData({ name: "", email: "", password: "", password2: "" });
        }, 3000);
    };

    const sendData = async (formdata) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post(url, formdata, config);

            console.log(data);
            handleAlert("danger", true, "Success!");
        } catch (err) {
            handleAlert("danger", true, "Server Error!");
        }
    }

    const submitHandler = e => {
        e.preventDefault();

        if (password !== password2 || !password || !password2) {
            handleAlert("danger", true, "Invalid Credentials!");

            setTimeout(() => {
                handleAlert();
            }, 3000);
        } else {
            sendData(formData);
        }
    }

    return (
        <>
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.msg}
                </div>
            )}
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