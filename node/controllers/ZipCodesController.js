//Importamos el model
import ZipCodesModel from "../models/ZipCodesModel.js";
import Sequelize from "sequelize";
//**Metodos para el CRUD */
export const getZipCodes = async  (req, res)=> {
    console.log("entre a zipcodes");
    try {
        const zips = await  ZipCodesModel.findAll();
        res.json(zips);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

export const getPaginatedZipCodes = async  (req, res)=> {
    try {
        const zips = await  ZipCodesModel.findAndCountAll({ limit: parseInt(req.query.limit),
            offset: parseInt(req.query.page > 0 ? req.query.page - 1 : 0) * parseInt(req.query.limit),
            // where: {zip:req.params.filterStr}
        });
        res.json(zips);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};



export const getFilterZipCodes = async  (req, res)=> {
    try { 
        const Op = Sequelize.Op;
        console.log(req.params.filterStr);
        if(req.params.filterStr ==='') return '';
        const zips =await ZipCodesModel.findAndCountAll({
            where: {zip: {[Op.like]: `${req.params.filterStr}%`}},
            limit: parseInt(20)});
      
        res.json(zips);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};


/* Get Record*/
export const getZipCode =async (req, res)=>{
    try {
        const zip =await ZipCodesModel.findAll({where:{idzip:req.params.id}});
        res.json(zip[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertZipCode =async(req,res) =>{
    try {
       await ZipCodesModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateZipCode = async (req, res) =>{
    try {
        ZipCodesModel.update(req.body, {
            where: {idzip:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteZipCode = async (req, res) =>{
    try {
        ZipCodesModel.destroy(req.body, {
            where: {idzip:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};