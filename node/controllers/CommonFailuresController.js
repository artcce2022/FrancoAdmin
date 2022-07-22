//Importamos el model
import CommonFailuresLaborsModel from "../models/CommonFailuresLaborsModel.js";
import CommonFailuresModel from "../models/CommonFailuresModel.js";
import CommonFailuresPartsModel from "../models/CommonFailuresPartsModel.js";
import ServiceFailuresModel from "../models/ServiceFailuresModel.js";
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
        const failure =await CommonFailuresModel.findAll({where:{idcommonfailures:req.params.id}, include:{all: true}});
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
        let countRef=await ServiceFailuresModel.count({where: {idcommonfailures:req.params.id}});
        console.log(countRef)
        if(countRef>0){
            res.json({message:"El Registro no se puede eliminar", error:true});
            return;
        }
        CommonFailuresModel.destroy({
            where: {idcommonfailures:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertCommonFailureLabor =async(req,res) =>{
    try {
       await CommonFailuresLaborsModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        res.json({message: error.message});
    }
};

export const updateCommonFailureLabor = async (req, res) =>{
    try {
        CommonFailuresLaborsModel.update(req.body, {
            where: {idcommonfailurelabor:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

export const deleteCommonFailureLabor = async (req, res) =>{
    try { 
        CommonFailuresLaborsModel.destroy({
            where: {idcommonfailurelabor:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

export const updateCommonFailurePart = async (req, res) =>{
    try {
        CommonFailuresPartsModel.update(req.body, {
            where: {idcommonfailurespart:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

export const deleteCommonFailurePart = async (req, res) =>{
    try { 
        CommonFailuresPartsModel.destroy({
            where: {idcommonfailurespart:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertCommonFailurePart =async(req,res) =>{
    try {
       await CommonFailuresPartsModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        res.json({message: error.message});
    }
};

export const getCommonFailureLabors =async (req, res)=>{
    try {
        const failures =await CommonFailuresLaborsModel.findAll({where:{idcommonfailures:req.params.id}, include:{all: true}});
        res.json(failures);
    } catch (error) {
        res.json({message: error.message});
    }
};

export const getCommonFailureLabor =async (req, res)=>{
    try {
        const failures =await CommonFailuresLaborsModel.findAll({where:{idcommonfailurelabor:req.params.id}, include:{all: true}});
        res.json(failures[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

export const getCommonFailureParts =async (req, res)=>{
    try {
        const failure =await CommonFailuresPartsModel.findAll({where:{idcommonfailures:req.params.id}, include:{all: true}});
        res.json(failure);
    } catch (error) {
        res.json({message: error.message});
    }
};

export const getCommonFailurePart =async (req, res)=>{
    try {
        const failure =await CommonFailuresPartsModel.findAll({where:{idcommonfailurespart:req.params.id}, include:{all: true}});
        console.log(failure)
        res.json(failure[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};