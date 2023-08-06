import api from "./Api";

const articleList = async () => {
    let response;
    try {
        response = await api.get("/article/getAll");
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error;
    }
}

const addArticle = async (data: any) => {
    let response;
    try {
        response = await api.post('/article/addArticle', data).then((resp) => {
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

const deleteArticle = async (id: string) => {
    return await api.delete('/article/delete/' + id).then((res) => {
        return res;
    }).catch((error) => {
        throw error;
    });
}

const updateArticle = async (id: string, data: any) => {
    if (!id) return;
    let response;
    try {
        response = await api.put("article/update/" + id, data);
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
        response = await api.get("article/get/" + id);
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
}

export default {
    articleList,
    addArticle,
    deleteArticle,
    updateArticle,
    getById,
}

