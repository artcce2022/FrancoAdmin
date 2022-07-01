import {Sequelize} from 'sequelize'
const db = new Sequelize('francomobile', 'root','xiadanylb*1+24',{
host:'localhost',
dialect:"mysql",
//  descomentar para Server Digitalocean 
//dialectOptions: {
//  socketPath: "/var/run/mysqld/mysqld.sock"
//}

});

export default db;
