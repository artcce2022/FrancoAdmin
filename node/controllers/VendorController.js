//Importamos el model
import VendorModel from "../models/VendorModel.js";

//**Metodos para el CRUD */
export const getVendors = async  (req, res)=> {
    console.log("entre a vendor");
    try {
        const vendors = await  VendorModel.findAll();
        res.json(vendors);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getVendor =async (req, res)=>{
    try {
        const vendor =await VendorModel.findAll({where:{idvendor:req.params.id}});
        res.json(vendor[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertVendor =async(req,res) =>{
    try {
       await VendorModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateVendor = async (req, res) =>{
    try {
        VendorModel.update(req.body, {
            where: {idvendor:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteVendor = async (req, res) =>{
    try {
        VendorModel.destroy(  {
            where: {idvendor:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};