//Importamos el model
import PartsCategoryModel from "../models/PartsCategoryModel.js";
import PartsModel from "../models/PartsModel.js";

//**Metodos para el CRUD */
export const getPartsCategories = async  (req, res)=> {
    console.log("entre a PartsCategory");
    try {
        const partsCategories = await  PartsCategoryModel.findAll();
        res.json(partsCategories);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getPartcategory =async (req, res)=>{
    try {
        const partsCategory =await PartsCategoryModel.findAll({where:{idpartscategory:req.params.id}});
        res.json(partsCategory[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertPartCategory =async(req,res) =>{
    try {
       await PartsCategoryModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updatePartCategory = async (req, res) =>{
    try {
        PartsCategoryModel.update(req.body, {
            where: {idpartscategory:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deletePartCategory = async (req, res) =>{
    try {
        let countRef=await PartsModel.count({where: {idpartcategory:req.params.id}});
        console.log(countRef)
        if(countRef>0){
            res.json({message:"El Registro no se puede eliminar", error:true});
            return;
        }
        PartsCategoryModel.destroy( {
            where: {idpartscategory:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};