//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const SymptomsCategoriesModel =  db.define('symptomscategories',{
    idsymptomcategory:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    category:{ type: DataTypes.STRING}
},{
    timestamps: false
});

//LocationsModel.belongsTo(CompanyModel);
export default SymptomsCategoriesModel;