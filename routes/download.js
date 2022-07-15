const router = require('express').Router();
const File = require('../models/file');


// same as show page.
router.get('/:uuid' , async(req,res)=>{
    
    const file = await File.findOne({ uuid : req.params.uuid});
    if(!file) {
        return res.render('download', { error : 'Link has been expired.'});
    }

    const filePath = `${__dirname}/../${file.path}`;
    //download will start download in clients system from the path which we have given.
    //file.path is coming from database where we stored location of file with its name.

    res.download(filePath);

} );

module.exports = router;
