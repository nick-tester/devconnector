import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetails } from "./assets/reducers/auth_actions";
import Navbar from "./layouts/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilesPage from "./pages/ProfilesPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    const dispatch = useDispatch();

    const { token, isAuthenticated } = useSelector(state => state.auth);

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
                {isAuthenticated && (
                    <>
                        <Route path="dashboard" element={<DashboardPage />} />
                    </>
                )}
                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
};

export default App;