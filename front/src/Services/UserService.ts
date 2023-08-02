import api from "./Api";


const userList = async () => {
    let response;
    try {
        response = await api.get(`/users/getAll`).then((response) => {
            return response.data;
        });
        return response;
    } catch (error: any) {
        console.log(error);
        alert(error.response.data.message);
    }
}


export default {
    userList,
}
