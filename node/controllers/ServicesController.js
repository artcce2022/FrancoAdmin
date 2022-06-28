//Importamos el model
import ServiceFailuresModel from "../models/ServiceFailuresModel.js";
import ServicesModel from "../models/ServicesModel.js";
import ServiceDetailsModel from "../models/ServiceDetailsModel.js";  
import ServiceFilesModel from "../models/ServiceFilesModel.js";
import fs from 'fs'
import ServicePartsModel from "../models/ServicePartsModel.js";
//**Metodos para el CRUD */
export const getAllServices = async (req, res) => {
    console.log("entre a getAllServices");
    try {
        const services = await ServicesModel.findAll({ include: { all: true } });
        res.json(services);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};

export const getService = async (req, res) => {
    console.log("entre a getService");
    try {
        const service = await ServicesModel.findAll({ where: { serviceid: req.params.id }, include: { all: true } });
        res.json(service);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};

export const getServiceFailures = async (req, res) => {
    console.log("entre a getServiceFailures");
    try {
        const serviceFAilures = await ServiceFailuresModel.findAll({ where: { idservice: req.params.id }, include: { all: true } });
        res.json(serviceFAilures);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};


export const getServiceDetails = async (req, res) => {
    console.log("entre a getServiceDetails");
    try {
        const serviceDetails = await ServiceDetailsModel.findAll({ where: { idservice: req.params.id }, include: { all: true } });
        res.json(serviceDetails);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};
export const getServiceFiles= async (req, res)=>{
    console.log("entre a getServiceDetails");
    try {
        const serviceFiles = await ServiceFilesModel.findAll({ where: { idservice: req.params.id }, include: { all: true } });
        res.json(serviceFiles);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}


export const getServiceParts = async (req, res) => {
    console.log("entre a getServiceParts");
    try {
        const serviceParts = await ServicePartsModel.findAll({ where: { idservice: req.params.id }, include: { all: true } });
        res.json(serviceParts);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};

export const saveServiceFile = async (req, res) => {
    console.log("entre a saveServiceFile"); 
    console.log(req.body); 
    console.log(req.file.mimetype);
    await ServiceFilesModel.create({
        idservice: req.body.idService,
        path:  '/files/' + req.body.uuid + "/",
        filename: req.file.originalname,
        filetype:req.file.mimetype,
        description: req.body.description,
        fileguid: req.body.uuid,
        visibilitycustomer: req.body.visibilitycustomer
    }); 
    try {
        console.log( req.files.file)
    } catch (error) {
        res.send(error.message);
    }
    // upload.single(filename)
    // app.post('/upload', upload.single(filename), (req, res) => {
    //     return res.json({ status: 'OK', uploaded: req.files.length });
    // });
   
    // upload.single(filename);
    // //res.status(200).send({ message: "File Uploaded", code: 200 });
    // upload(req, res, function (err) {
    //     if (err) {
    //         res.status(500).send({ message: err, code: 200 });
    //     }
    //     else res.status(200).send({ message: "File Uploaded", code: 200 });
    // }
    // )
    //  const __filename = fileURLToPath(import.meta.url);

    //     // 👇️ "/home/john/Desktop/javascript"
    //     const __dirname = path.dirname(__filename);
    //     console.log(__dirname);
    //     const newpath = __dirname + "/files/"; 
    //    console.log(newpath)
    //    console.log(filename)
    //     file.mv(`${newpath}${filename}`, (err) => {
    //       if (err) {
    //         res.status(500).send({ message: err, code: 200 });
    //       }
    //       res.status(200).send({ message: "File Uploaded", code: 200 });
    //     });
};

/*Insert Record*/
export const insertService = async (req, res) => {
    try {
        await ServicesModel.create(req.body);
        res.json({ 'message': 'Registro Creado Exitosamente' });
    } catch (error) {

        res.json({ message: error.message });
    }

};
/*Insert Record*/
export const saveService = async (req, res) => {
    const NOW = new Date();
    try {
      
        let data =req.body;
        let newIdService;
        console.log(data);
        let result = await ServicesModel.create({
            idcompany: 1,//data.idcompany,
            idcustomer: data.idCustomer,
            idvehicle: data.idVehicle,
            idlocation: data.idLocation,
            datecreate: NOW,
            iduser: 1,
            recibe: data.recibe,
            comments: data.comments,
            idservicestatus: 1,
            serviceid: req.params.id
        });

        newIdService = result.idservice;
        data.FailureList.map((failure) => {
            ServiceFailuresModel.create({ idservice: newIdService, idcommonfailures: failure.idcommonfailures });
        });

        data.DetailList.map((detail) => {
            ServiceDetailsModel.create({ idservice: newIdService, detail: detail.description });
        });
        res.json({ 'message': 'Registro Creado Exitosamente' });
    } catch (error) {

        res.json({ message: error.message });
    }

};

/*Insert Record*/
export const insertServiceCommonFailure =async(req,res) =>{
    try {
       await ServiceFailuresModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};
 
export const insertServiceDetail =async(req,res) =>{
    try {
       await ServiceDetailsModel.create(req.body);
       res.json({'message':'Registro Creado Exitosamente'});
    } catch (error) {
        
        res.json({message: error.message});
    }

};


/* Update Record*/
export const updateServiceCommonFailure = async (req, res) => {
    try {
        ServiceFailuresModel.update(req.body, {
            where: { idservicefailures: req.params.id }
        });
        res.json({ 'message': "Registro Actualizado Exitosamente" });
    } catch (error) {

        res.json({ message: error.message });
    }
};

/* Update Record*/
export const updateService = async (req, res) => {
    try {
        ServicesModel.update(req.body, {
            where: { idservice: req.params.id }
        });
        res.json({ 'message': "Registro Actualizado Exitosamente" });
    } catch (error) {

        res.json({ message: error.message });
    }
};

/* Update Record*/
export const getFile = async (req, res) => {
    try {
        const path="./" + req.body.path;
        res.download(path);
    } catch (error) {

        res.json({ message: error.message });
    }
};

/* Delete Record*/
export const deleteFileService = async (req, res) => {
    try {
        ServiceFilesModel.destroy( {
            where: {idservicefile:req.params.id}
        });   
        
        res.json({message:"Registro Eliminado Exitosamente"});
    } catch (error) {
        
        res.json({message: error.message});
    }

    try {
        const path="./" + req.body.path;      
        fs.unlinkSync(path);
    } catch (error) {
      
    }
};
