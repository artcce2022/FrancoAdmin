//Importamos el model
import EmployeeModel from "../models/EmployeeModel.js";

//**Metodos para el CRUD */
export const getEmployees = async  (req, res)=> {
    console.log("entre a companies");
    try {
        const employees = await  EmployeeModel.findAll();
        res.json(employees);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getEmployee =async (req, res)=>{
    try {
        const employee =await EmployeeModel.findAll({where:{idEmployee:req.params.id}});
        res.json(employee[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertEmployee =async(req,res) =>{
    try {
       await EmployeeModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateEmployee = async (req, res) =>{
    try {
        EmployeeModel.update(req.body, {
            where: {idEmployee:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteEmployee = async (req, res) =>{
    try {
        EmployeeModel.destroy(  {
            where: {idemployee:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};