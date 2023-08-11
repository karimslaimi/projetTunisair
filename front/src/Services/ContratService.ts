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

export default {
    contratList,
    addContrat,
}