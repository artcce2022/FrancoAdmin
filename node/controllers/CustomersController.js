//Importamos el model
import CustomersModel from "../models/CustomersModel.js";

//**Metodos para el CRUD */
export const getCustomers = async  (req, res)=> {
    console.log("entre a customers");
    try {
        const custopmers = await  CustomersModel.findAll();
        res.json(custopmers);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getCustomer =async (req, res)=>{
    try {
        const customer =await CustomersModel.findAll({where:{idCustomer:req.params.id}});
        res.json(customer[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertCustomer =async(req,res) =>{
    try {
       await CustomersModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateCustomer = async (req, res) =>{
    try {
        CustomersModel.update(req.body, {
            where: {idCustomer:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteCustomer = async (req, res) =>{
    try {
        CustomersModel.destroy(req.body, {
            where: {idCustomer:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};