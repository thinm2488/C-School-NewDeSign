var express = require('express');
var session = require('express-session')
var router = express.Router();
var Diligence = require('../controller/diligenceController');


router.get('/:id', async function (req, res) {
    try {
        var list = await Diligence.getall(req.params.id);
        let diligence=list.diligence
       
        if(diligence){
            res.send({
                diligence,
                status:200
            })
        }else{
            res.send({
                mess:"Học sinh không có ngày nghỉ",
            
            })

        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})


module.exports = router;