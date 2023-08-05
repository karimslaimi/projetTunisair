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
            return resp;
        }).catch((error:any)=>{
            console.log(error);
            throw error;
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;

}

const deleteUser = async (id: string) => {
    return await api.delete('/users/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

export default {
    userList,
    addUser,
    deleteUser
}
