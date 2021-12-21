import { Outlet } from "react-router-dom";
import Alert from "../components/Alert";

const AuthPage = () => {
    return (
        <section className="container">
            <Alert />
            <Outlet />
        </section>
    )
}

export default AuthPage;