import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./layouts/Navbar";
import LandingPage from "./pages/LandingPage";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} exact />
            </Routes>
        </Router>
    )
};

export default App;