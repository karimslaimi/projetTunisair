import api from "./Api";

const countStat = async ()=>{
    let response:any;
    try{
        response = await api.get("/dashboard/countStat");
    }catch (error:any){
        console.log(error);
        throw error;
    }
    return response.data;
}

const latestDelay = async () =>{
    let response: any;
    try{
        response = await api.get("/dashboard/latestDelay");
    }catch (e){
        console.log(e);
        throw e;
    }
    return response;
}

const latestContract = async ()=>{
    let response:any;
    try{
        response = await api.get("/dashboard/latestContract");
    }catch (e){
        console.log(e);
        throw e;
    }
    return response;
}

const contractCountBySupplier = async ()=>{
    let response: any;
    try{
        response = await api.get("/dashboard/contractCountBySupplier");
    }catch (e) {
        console.log(e);
        throw e;
    }
    return response;
}

const contractByRetard = async ()=>{
    let response:any;
    try{
        response = await api.get("/dashboard/contractByRetard");
    }catch (error){
        console.log(error);
        throw error;
    }
    return response;
}

const getMonthlyVolCounts = async ()=>{
    let response:any;
    try{
        response = await api.get("/dashboard/getMonthlyVolCounts");
    }catch (e) {
        console.log(e);
        throw e;
    }
    return response;
}


export default {
    countStat,
    latestDelay,
    latestContract,
    contractCountBySupplier,
    contractByRetard,
    getMonthlyVolCounts
}