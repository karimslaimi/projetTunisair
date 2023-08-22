import api from "./Api";

const contratList = async () => {
    let response;
    try {
        response = await api.get("/contrat/getAll");
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}
const addContrat = async (data: any) => {
    let response;
    try {
        response = await api.post('/contrat/add', data).then((resp) => {
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

const deleteContrat = async(id:string)=>{
    return await api.delete('/contrat/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

const getById = async (id: string) => {
    if (!id) return;
    let response;
    try {
        response = await api.get("contrat/get/" + id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
}
const updateContrat = async (id: string, data: any) => {
    if (!id) throw new Error("Id not specified");
    let response;
    try {
        response = await api.put("contrat/update/" + id, data);
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
    return response;
}
const getByRetard = async (id:string)=>{
    if(!id) return;
    let response:any;
    try{
        response = await api.get("/contrat/getByRetard/"+id);
    }catch (error){
        console.log(error);
        throw error;
    }
    return response;
}

export default {
    contratList,
    getById,
    addContrat,
    updateContrat,
    deleteContrat,
    getByRetard
}