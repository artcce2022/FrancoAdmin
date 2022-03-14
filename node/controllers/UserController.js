//Importamos el model
import UsersModel from "../models/UsersModel.js";

//**Metodos para el CRUD */
export const login = async  (req, res)=> {
    try {
        const user = await  UsersModel.findAll();
        res.json(user);
    } catch (error) {
        res.json({message: error.message});
    }
};
