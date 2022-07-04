//Importamos el model
import PartsModel from "../models/PartsModel.js";
import WarehouseModel from "../models/WarehouseModel.js";

//**Metodos para el CRUD */
export const getWarehouses = async  (req, res)=> {
    console.log("entre a warehouse");
    try {
        const warehouses = await  WarehouseModel.findAll();
        res.json(warehouses);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getWarehouse =async (req, res)=>{
    try {
        const warehouse =await WarehouseModel.findAll({where:{idwarehouse:req.params.id}});
        console.log(warehouse);
        res.json(warehouse[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

/*Insert Record*/
export const insertWarehouse =async(req,res) =>{
    try {
       await WarehouseModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
/* Update Record*/
export const updateWarehouse = async (req, res) =>{
    try {
        WarehouseModel.update(req.body, {
            where: {idwarehouse:req.params.id}
        });   
        res.json({'message':"Registro Actualizado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};

/* Delete Record*/
export const deleteWarehouse = async (req, res) =>{
    try {
        let countRef=await PartsModel.count({where: {idwarehouse:req.params.id}});
        console.log(countRef)
        if(countRef>0){
            res.json({message:"El Registro no se puede eliminar", error:true});
            return;
        }
        WarehouseModel.destroy( {
            where: {idwarehouse:req.params.id}
        });   
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }
};