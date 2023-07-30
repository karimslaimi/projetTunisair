import {BASE_URL} from 'configs/AppConfig';
import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        "Access-Control-Allow-Origin": "localhost:8081"
    }
};

export const signIn = async (userName, password) => {
    let response;

    try {
        response = await axios.post(`${BASE_URL}/auth/login`, {userName, password}, config).then(x => {
            return x;
        });
        if (response.status === 200) {

            return response.data;

        } else {
            return null;
        }
    } catch (error) {

        alert(error.response.data.message);
        console.log(error.response.data.message);

    }
    return response;
};


export const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

}
const authService = {
    signIn,
    logOut
}

export default authService;
