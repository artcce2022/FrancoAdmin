//Importamos el model
import CustomerContactsModel from "../models/CustomerContactsModel.js";

//**Metodos para el CRUD */
export const getAllContacts = async  (req, res)=> {
    console.log("entre a contacts");
    try {
        const contacts = await  CustomerContactsModel.findAll();
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

export const getCustomerContacts = async  (req, res)=> {
    console.log("entre a customercontacts");
    try {
        const contacts = await  CustomerContactsModel.findAll({where:{idCustomer : req.params.id}, include:{all: true}});
      
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getCustomerContact =async (req, res)=>{
    try {
        const contact =await CustomerContactsModel.findAll({where:{idcustomercontact:req.params.id}});
        res.json(contact[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertCustomerContact =async(req,res) =>{
    try {
       await CustomerContactsModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateCustomerContact = async (req, res) =>{
    try {
        CustomerContactsModel.update(req.body, {
            where: {idcustomercontact:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteCustomerContact = async (req, res) =>{
    try {
        CustomerContactsModel.destroy({
            where: {idcustomercontact:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};