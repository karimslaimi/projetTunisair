import api from "./Api";

const volList = async () => {
    let response;
    try {
        response = await api.get("/vol/getAll");
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}

const addvol = async (data: any) => {
    let response;
    try {
        response = await api.post('/vol/addVol', data).then((resp) => {
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

const deletevol = async (id: string) => {
    return await api.delete('/vol/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

const updatevol = async (id: string, data: any) => {
    if (!id) throw new Error("Id not specified");
    let response;
    try {
        response = await api.put("vol/update/" + id, data);
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
        response = await api.get("/vol/get/" + id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
}

export default {
    volList,
    addvol,
    deletevol,
    updatevol,
    getById,
}

