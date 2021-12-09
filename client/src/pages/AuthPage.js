import { Outlet } from "react-router-dom";

const AuthPage = () => {
    return (
        <section className="container">
            <Outlet />
        </section>
    )
}

export default AuthPage;