import api from "./Api";

const detailList = async (id:string) => {
    if (!id) return;
    let response;
    try {
        response = await api.get("/detail/getByFacture/"+id);
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}

const addDetail = async (data: any) => {
    let response;
    try {
        response = await api.post('/detail/add', data).then((resp) => {
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

const deleteDetail = async(id:string)=>{
    return await api.delete('/detail/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

const getById = async (id: string) => {
    if (!id) return;
    let response: any;
    try {
        response = await api.get("detail/get/" + id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
}

const updateDetail = async (id: string, data: any) => {
    if (!id) throw new Error("Id not specified");
    let response;
    try {
        response = await api.put("detail/update/" + id, data);
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
    return response;
}


export default {
    detailList,
    getById,
    addDetail,
    updateDetail,
    deleteDetail,
}