import api from "./Api";

const factureList = async () => {
    let response;
    try {
        response = await api.get("/facture/getAll");
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}

const addFacture = async (data: any) => {
    let response;
    try {
        response = await api.post('/facture/add', data).then((resp) => {
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

const deleteFacture = async(id:string)=>{
    return await api.delete('/facture/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

const getById = async (id: string) => {
    if (!id) return;
    let response: any;
    try {
        response = await api.get("facture/get/" + id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
}

const updateFacture = async (id: string, data: any) => {
    if (!id) throw new Error("Id not specified");
    let response;
    try {
        response = await api.put("facture/update/" + id, data);
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
    return response;
}


export default {
    factureList,
    getById,
    addFacture,
    updateFacture,
    deleteFacture,
}