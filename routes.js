const express = require('express');
const File = require('./modeleFile');
const multer = require ('multer');
const uuid = require('uuid').v4;

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const {originalname} = file;
        cb(null, `${uuid()}-${originalname}`);
    }
})

const upload = multer({storage :storage});

router.post('/post', upload.array('files') ,async(req,res) => {
    
    req.files.forEach(async (file) => {
        console.log(req.body);
        let fileData = new File({
            name : file.filename ,
            path: file.path,
            datePost: req.body.date
         });
         console.log(fileData);
         try {
            await fileData.save();
        } catch (error) {
            //res.json({ message: error });
            console.error(error);
        }
    });    
    res.json({status : 'OK', uploaded: req.files.length});
});


router.get('/getFiles', async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/getFile/:nameFile', async (req, res) => {
    console.log(req.params.idFile);
    try {
        //const files = await File.findById(req.params.idFile);
        const files = await File.findOne({name : req.params.nameFile});
        res.json(files);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;