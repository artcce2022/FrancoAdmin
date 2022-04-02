//Importamos el model
import VehiclesModel from "../models/VehiclesModel.js";

//**Metodos para el CRUD */
export const getAllVehicles = async  (req, res)=> {
    console.log("entre a vehicles");
    try {
        const vehicles = await  VehiclesModel.findAll();
        res.json(vehicles);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

export const getVehicles = async  (req, res)=> {
    console.log("entre a vehicles");
    try {
        const vehicles = await  VehiclesModel.findAll({where:{idCustomer : req.params.id}, include:{all: true}});
        res.json(vehicles);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getVehicle =async (req, res)=>{
    try {
        const vehicle =await VehiclesModel.findAll({where:{idVehicle:req.params.id}});
        res.json(vehicle[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertVehicle =async(req,res) =>{
    try {
       await VehiclesModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateVehicle = async (req, res) =>{
    try {
        VehiclesModel.update(req.body, {
            where: {idVehicle:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteVehicle = async (req, res) =>{
    try {
        VehiclesModel.destroy(req.body, {
            where: {idVehicle:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};