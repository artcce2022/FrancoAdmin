import multer from 'multer'; 
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path='./files/' + req.body.uuid + "/";
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
    },
    filename: function (req, file, cb) {
        const { originalname } = file;
        // or 
        // uuid, or fieldname        
        cb(null, originalname);
    },

});  

// const fileFilter = (req, file, cb) => {
//     if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
//         cb(null, true);
//     } else{
//         cb(null, false);

//     }

// }; 
let upload = multer({ storage: storage}); 
export default upload.single('ServiceFile')

