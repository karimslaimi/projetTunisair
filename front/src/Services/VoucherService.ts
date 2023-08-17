import api from "./Api";


const createVoucher = async (data: any) => {
    let response;
    try {
        response = await api.post('/bon/createVoucher', data).then((resp) => {
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

const voucherList = async (id:string) => {
    let response;
    try {
        response = await api.get("/bon/byretard/"+id);
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}

const deleteVoucher = async (id:string)=>{
    return await api.delete('/bon/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

const updateVoucher = async (id:string, data:any)=>{
    if (!id) throw new Error("Id not specified");
    let response;
    try {
        response = await api.put("/bon/update/" + id, data);
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
    return response;
}

const getById = async (id: string) => {
    if (!id) return;
    let response;
    try {
        response = await api.get("/bon/get/" + id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response.data;
}

const consumeVoucher = async (id: string) => {
    if (!id) return;
    let response;
    try {
        response = await api.put("/bon/consume/" + id);
    } catch (error) {
        console.log(error);
    }
    return response;
}

export default {
    createVoucher,
    voucherList,
    deleteVoucher,
    updateVoucher,
    getById,
    consumeVoucher,
}