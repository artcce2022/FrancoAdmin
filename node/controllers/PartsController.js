//Importamos el model
import PartsModel from "../models/PartsModel.js";

//**Metodos para el CRUD */
export const getParts = async  (req, res)=> {
    console.log("entre a companies");
    try {
        const parts = await  PartsModel.findAll();
        res.json(parts);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getPart =async (req, res)=>{
    try {
        const part =await PartsModel.findAll({where:{idParts:req.params.id}});
        res.json(part[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertPart =async(req,res) =>{
    console.log(req.body);
    try {
       await PartsModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updatePart = async (req, res) =>{
    try {
        PartsModel.update(req.body, {
            where: {idParts:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteParts = async (req, res) =>{
    try {
        PartsModel.destroy(req.body, {
            where: {idParts:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};