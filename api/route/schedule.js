var express = require('express');
var session = require('express-session')
var router = express.Router();
var studentController = require('../controller/studentController');
// var authController = require('../controller/authController');
var scheduleController= require('../controller/scheduleController')
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');
 //xamarin
router.post('/currentschedule', async function (req, res) {
    try {
        let date= new Date();
        var schedule= await scheduleController.getCurrentSchedule(req.body.soHieu, date.getDay());
        console.log(date.getDay())
        let listmonhoc= schedule.listmonhoc;
        res.send({
           listmonhoc
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }

})
///
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

router.post('/byclass', async function (req, res) {
    try {
    
     
        var schedule= await scheduleController.getschedulebyclass(req.body)
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
router.put('/update', async function (req, res) {
    try {
    
     
        var schedule= await scheduleController.updateSchedule(req.body)
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
router.post('/create', async function (req, res) {
    try {
    
     
        var schedule= await scheduleController.createSchedule(req.body)
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