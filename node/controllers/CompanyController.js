//Importamos el model
import CompanyModel from "../models/CompanyModel.js";

//**Metodos para el CRUD */
export const getCompanies = async  (req, res)=> {
    console.log("entre a companies");
    try {
        const companies = await  CompanyModel.findAll();
        res.json(companies);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getCompany =async (req, res)=>{
    try {
        const company =await CompanyModel.findAll({where:{idCompany:req.params.id}});
        res.json(company[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertCompany =async(req,res) =>{
    try {
       await CompanyModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateCompany = async (req, res) =>{
    try {
        CompanyModel.update(req.body, {
            where: {idCompany:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteCompany = async (req, res) =>{
    try {
        CompanyModel.destroy(req.body, {
            where: {idCompany:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};