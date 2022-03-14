//Importamos el model
import LocationsModel from "../models/LocationsModel.js";

//**Metodos para el CRUD */
export const getLocations = async  (req, res)=> {
    console.log("entre a companies");
    try {
        const locations = await  LocationsModel.findAll();
        res.json(locations);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getLocation =async (req, res)=>{
    try {
        const location =await LocationsModel.findAll({where:{idLocation:req.params.id}});
        res.json(location[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertLocation =async(req,res) =>{
    try {
       await LocationsModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateLocation = async (req, res) =>{
    try {
        LocationsModel.update(req.body, {
            where: {idLocation:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteLocation = async (req, res) =>{
    try {
        LocationsModel.destroy(req.body, {
            where: {idLocation:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};