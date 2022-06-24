import {Sequelize} from 'sequelize'
const db = new Sequelize('francomobile', 'root','Ku355wts',{
host:'localhost',
dialect:"mysql",
//  descomentar para Server Digitalocean 
//dialectOptions: {
//  socketPath: "/var/run/mysqld/mysqld.sock"
//}

});

export default db;
