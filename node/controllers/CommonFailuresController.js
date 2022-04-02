//Importamos el model
import CommonFailuresModel from "../models/CommonFailuresModel.js";
import SymptomsCategoriesModel from "../models/SymptomsCategoriesModel.js";

//**Metodos para el CRUD */
export const getCommonFailures = async  (req, res)=> {
    console.log("entre a Common Failures");
    try {
        const failures = await  CommonFailuresModel.findAll({ include: SymptomsCategoriesModel });
        res.json(failures);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getCommonFailure =async (req, res)=>{
    try {
        const failure =await CommonFailuresModel.findAll({where:{idcommonfailures:req.params.id}});
        res.json(failure[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertCommonFailure =async(req,res) =>{
    try {
       await CommonFailuresModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateCommonFailure = async (req, res) =>{
    try {
        CommonFailuresModel.update(req.body, {
            where: {idcommonfailures:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteCommonFailure = async (req, res) =>{
    try {
        CommonFailuresModel.destroy(req.body, {
            where: {idcommonfailures:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};