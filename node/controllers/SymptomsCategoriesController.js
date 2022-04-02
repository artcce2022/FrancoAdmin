//Importamos el model
import SymptomsCategoriesModel from "../models/SymptomsCategoriesModel.js";

//**Metodos para el CRUD */
export const getSymptomsCategories = async  (req, res)=> {
    console.log("entre a SymptomsCategories");
    try {
        const categories = await  SymptomsCategoriesModel.findAll();
        res.json(categories);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getSymptomCategory =async (req, res)=>{
    try {
        const category =await SymptomsCategoriesModel.findAll({where:{idSymptomCategory:req.params.id}});
        res.json(category[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertSymptomCategory =async(req,res) =>{
    try {
       await SymptomsCategoriesModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateSymptomCategory = async (req, res) =>{
    try {
        SymptomsCategoriesModel.update(req.body, {
            where: {idSymptomCategory:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteSymptomCategory = async (req, res) =>{
    try {
        SymptomsCategoriesModel.destroy(req.body, {
            where: {idSymptomCategory:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};