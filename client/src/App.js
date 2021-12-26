import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetails } from "./assets/reducers/auth_actions";
import Navbar from "./layouts/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";

const App = () => {
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(getUserDetails());
        }
    }, [dispatch, token]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} exact />
                <Route path="/auth" element={<AuthPage />}>
                    <Route path="signin" element={<SigninPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>
            </Routes>
        </Router>
    )
};

export default App;