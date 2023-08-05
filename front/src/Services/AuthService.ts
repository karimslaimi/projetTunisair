import axios from "axios";
import {BASE_URL, config} from "../utils/config";
import {useDispatch} from "react-redux";
import {logOut} from "../stores/authSlice";


const signIn = async (userName: string, password: string) => {
    let response;

    try {
        response = await axios.post(`${BASE_URL}/auth/login`, {userName, password}, config).then(x => {
            return x;
        });
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;

        } else {
            return null;
        }
    } catch (error: any) {

        alert(error.response.data.message);
        console.log(error.response.data.message);

    }
    return response;
};


const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    const dispatch = useDispatch();
    dispatch(logOut({}));
}

export default {
    signIn,
    logOut
}
