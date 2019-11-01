var express = require('express');
var session = require('express-session')
var router = express.Router();
var studentController = require('../controller/studentController');
// var authController = require('../controller/authController');
var scheduleController= require('../controller/scheduleController')
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');
 

router.post('/', async function (req, res) {
    try {
        var student = await studentController.layChiTietStudent(req.body.id);
     
        var schedule= await scheduleController.getschedule(student)
        if(schedule){
            res.send({
                schedule,
                status:200
            })
        }else{
            res.send({
                mess:"Không có thời khóa biểu trong thhời gian này!",
            
            })

        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})


module.exports = router;