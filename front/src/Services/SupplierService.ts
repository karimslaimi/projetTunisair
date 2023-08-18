import api from "./Api";

const supplierList = async () => {
    let response;
    try {
        response = await api.get("/supplier/getAll");
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}

const addSupplier = async (data: any) => {
    let response;
    try {
        response = await api.post('/supplier/create', data).then((resp) => {
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

const deleteSupplier = async (id: string) => {
    return await api.delete('/supplier/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

const updateSupplier = async (id: string, data: any) => {
    if (!id) return;
    let response;
    try {
        response = await api.put("supplier/update/" + id, data);
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
    return response;
}

const getById = async (id: string) => {
    if (!id) return;
    let response:any;
    try {
        response = await api.get("supplier/get/" + id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
}


const sendMail = async (id:string, subject:string,message:string)=>{
    if(!id) return;
    let response;
    try {
        response = await api.post("/supplier/sendmail/"+id,{subject,message});
    }catch (error){
        console.log(error);
        throw error;
    }
    return response;
}

export default {
    supplierList,
    addSupplier,
    deleteSupplier,
    updateSupplier,
    getById,
    sendMail,
}

