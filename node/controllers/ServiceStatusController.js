//Importamos el model
import ServiceStatusModel from "../models/ServiceStatusModel.js";

//**Metodos para el CRUD */
export const getAllServiceStatus = async  (req, res)=> {
    console.log("entre a getServiceStatus");
    try {
        const serviceStatus = await  ServiceStatusModel.findAll();
        res.json(serviceStatus);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getServiceStatus =async (req, res)=>{
    try {
        const serviceStatus =await ServiceStatusModel.findAll({where:{idservicestatus:req.params.id}});
        res.json(serviceStatus[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};