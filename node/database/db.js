import {Sequelize} from 'sequelize'
const db = new Sequelize('francomobile', 'root','xiadanylb*1+24',{
host:'localhost',
dialect:"mysql"

});

export default db;