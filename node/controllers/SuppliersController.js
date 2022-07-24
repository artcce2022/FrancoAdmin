//Importamos el model
import SuppliersModel from "../models/SuppliersModel.js";

//**Metodos para el CRUD */
export const getSuppliers = async  (req, res)=> {
    console.log("entre a proveedor");
    try {
        const suppliers = await  SuppliersModel.findAll();
        res.json(suppliers);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getSupplier =async (req, res)=>{
    try {
        const suppliers =await SuppliersModel.findAll({where:{idsuppliers:req.params.id}});
        res.json(suppliers[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertSuppliers =async(req,res) =>{
    try {
       await SuppliersModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateSuppliers = async (req, res) =>{
    try {
        SuppliersModel.update(req.body, {
            where: {idsuppliers:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteSuppliers = async (req, res) =>{
    try {
        SuppliersModel.destroy(  {
            where: {idsuppliers:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};