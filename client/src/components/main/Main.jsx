import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../sidebar/Sidebar";
import axiosInstance from "../../utils/axiosInstance";
import { userActions } from "../../store/userSlice";

export default function Main() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    if(!user) {
        console.log("no user");
        
        axiosInstance.post("/validate-token")
            .then(response => {
                console.log(response);
                
                dispatch(userActions.changeUser(response));
            })
            .catch(err => {
                navigate("/auth");
            })
    }

    return(
        <div>
            <SideBar />
            <Outlet />
        </div>
    )
}