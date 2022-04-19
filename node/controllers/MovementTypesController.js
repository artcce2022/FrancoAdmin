//Importamos el model
import MovementTypesModel from "../models/MovementTypesModel.js";

//**Metodos para el CRUD */
export const getMovementTypes = async  (req, res)=> {
    console.log("entre a movementtypes");
    try {
        const movementtypes = await  MovementTypesModel.findAll();
        res.json(movementtypes);
    } catch (error) {
        console.log(error.message);
        res.json({message: error.message});
    }
};

/* Get Record*/
export const getMovementType =async (req, res)=>{
    try {
        const movementtype =await MovementTypesModel.findAll({where:{idmovementtype:req.params.id}});
        res.json(movementtype[0]);
    } catch (error) {
        res.json({message: error.message});
    }
};

