import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentUserProfile } from "../assets/reducers/profile_actions";


const Dashboard = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getCurrentUserProfile());
    }, [dispatch]);

    return (
        <div className="container">
            <h4>Dashboard component</h4>
        </div>
    )
}

export default Dashboard;