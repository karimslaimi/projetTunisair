import api from "./Api";

const addDelay = async (data: any) => {
    let response;
    try {
        response = await api.post('/retard/add', data).then((resp) => {
            return resp;
        }).catch((error: any) => {
            console.log(error);
            throw error;
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
}

const retardList = async ()=>{
    let response;
    try {
        response = await api.get("/retard/getAll");
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}



export default {
    addDelay,
    retardList,
}