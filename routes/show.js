const router =require('express').Router();
const File = require('../models/file');

const APP_BASE_URL="http://localhost:3000";
// colon (:) is used bcoz uuid is dynamic parameter.

router.get('/:uuid', async (req,res)=>{

    try{
        // file variable contains data fetched from database.
        // params will contain all the dynamic parameter which are coming from frontend.
        //here it is only uuid.
        const file = await File.findOne({uuid : req.params.uuid});
        if(!file) {
            //render will show download page on the screen.
            // and parameters are error.
            return res.render('download', {error : 'Link has been expired. '});
        }

        //if everything works fine then it will download page will all the attributes.
        //we pass in it. 
        return res.render('download', {
            uuid: file.uuid,
            fileName : file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
            // http://localhost:3000/files/download/uuid

        }); 

    } catch(err) {
        return res.render('download', {error : 'Something went wrong. '});
    }


});


module.exports = router;
