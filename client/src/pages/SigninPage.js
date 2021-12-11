import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:5000/api/auth/login";

const SigninPage = () => {
    const [alert, setAlert] = useState({ type: "danger", show: false, msg: "" });
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [authenticated, setAuthenticated] = useState({
        token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
        passed: localStorage.getItem("token") !== null ? true : false
    });

    const navTo = useNavigate();

    const { email, password } = formData;

    const onChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAlert = (type = "danger", show = false, msg = "") => {
        setAlert({ type, show, msg });

        setTimeout(() => {
            setAlert({ type: "danger", show: false, msg: "" });
            setFormData({ email: "", password: "" });
        }, 3000);
    };

    useEffect(() => {
        if (authenticated.passed) {
            navTo("/");
        }
    }, [authenticated.passed, navTo]);

    const sendData = async (formdata) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post(url, formdata, config);

            localStorage.setItem("token", JSON.stringify(data.token));
            setAuthenticated({ token: data.token, passed: true });
        } catch (err) {
            console.error(err.message);
        }
    }

    const submitHandler = e => {
        e.preventDefault();

        if (!password || !email) {
            handleAlert("danger", true, "Invalid Credentials!");
        } else {
            sendData(formData);
            handleAlert("success", true, "Success!")
        }
    };

    return (
        <>
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.msg}
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