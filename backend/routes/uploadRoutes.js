import express from 'express';
import multer from 'multer';
import path  from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req,file,cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb){
    const fileTypes = /.jpg|.png|.jpeg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if(extname && mimeType){
        cb(null, true);
    }
    else{
        cb('Images only');
    }
}

const upload = multer({
    storage,
    fileFilter : function(req, file, cb) {
        checkFileType(file, cb);
    }
})

router.post('/',upload.single('image'), (req,res) => {
    res.send(`/${req.file.path}`);
})

export default router;