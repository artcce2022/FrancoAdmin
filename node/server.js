
import express from 'express';
import cors from 'cors';
import db from "./database/db.js"
import bodyParser from 'body-parser'
import fileupload from 'express-fileupload'

import routes from './routes/routes.js' 
var app = express();
app.set("port", 3001);
app.use(cors());
//app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use('/', routes); 

try {
    await db.authenticate();
    console.log("Conexion exitosa a la bd");
} catch (error) {
    console.log(`Error al Conectar a la bd, error: ${error}`);
}
app.get('/', (req, res) => {
    res.send('Hola World!')
  })
  

  app.listen(app.get("port"), function () {
    console.log("Server Started on port " + app.get("port"));
});
