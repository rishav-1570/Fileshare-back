const router = require('express').Router();
const multer = require('multer'); //import multer for handling files.
const path = require('path'); //in-build node module (used here to get extension of file)
const File = require('../models/file');// import model.file (Schema of mongoose)
const {v4: uuid4} = require('uuid');
//const { Error } = require('mongoose');
//const { MulterError } = require('multer');

const APP_BASE_URL="http://localhost:3000";

//basic config for multer
let storage = multer.diskStorage({
    destination: ( req, file, cb)=> cb(null , 'uploads/'),//cb(error,path)
    //file name must be unique 
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})
// some more config for multer
let upload = multer({
    storage: storage,
    limit: {fileSize : 1000000 * 100}, //in KB (approx 100 mb).

}).single('myfile');
//single means we upload one file.
//'myfile' is name attribute in input or name given when creating api.


// uploading file request from the frontend through API.
// 
router.post('/', async (req,res)=>{
    
    
    //Store file
    upload(req,res, async ()=> {

        // Validate Request

        if(!req.file){
            return res.json({error : 'All fields are required.'});
    
        }


        // if(MulterError) {
        //     return res.status(500).send({error : MulterError});
        // }

        //store into Database
        const file = new File({
            filename: req.file.filename,
            uuid : uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();


        return res.json({file : `${APP_BASE_URL}/files/${response.uuid}`});
        // http://localhost:3000/files/uuid

    });
    

    //response -> link
});








//it will take post request from all urls with '/send' type.
// The data will be in json format.
router.post('/send', async(req,res) => {
    //testing only that what req.body returns.
    //console.log(req.body);
    
    //destructuring the req.body .
    const {uuid, emailTo, emailFrom } = req.body;
    //validate request

    if(!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All feilds are required.'});

    }
    
    //Get data from database.
    const file = await File.findOne({uuid : uuid});

    // if sender already exist.
    if(file.sendor){
        return res.status(422).send({ error: 'Email already sent.'});
    }

    // Save details in database.
    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    //send Email
    // import function from emailservices file in sendMail.
    // call the function and passing the parameters needed in object type.
    // email template is in the form of html string which is large.
    //we will import template from other file.
    // emailTemplate also needs some parameters so we pass it in form of object.


    const sendMail = require('../Services/emailService');
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'File Sharing ',
        text: `${emailFrom} shared a file with you.`,
        html: require('../Services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000) + ' KB',
            expires: '24 hours'
        })
    });

    return res.send({ success : true});

});

module.exports = router;