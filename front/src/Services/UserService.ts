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

const addUser = async (data:any)=>{
    let response;
    try{
        response = await api.post('/users/addUser',data).then((resp)=>{
            response = resp;
        }).catch((error:any)=>{
            console.log(error);
            alert(error);
            return error;
        });
    }catch (error){
        console.log(error);
    }
    return response;

}

export default {
    userList,
    addUser,
}
