import {Sequelize} from 'sequelize'
const db = new Sequelize('francomobile', 'root','Ku355wts',{
host:'localhost',
dialect:"mysql"

});

export default db;
