var express = require('express');
var session = require('express-session')
var router = express.Router();
var studentController = require('../controller/studentController');
var strancriptController=require('../controller/transcriptController');
var teacherController=require('../controller/teacherController')

 
router.get('/:id', async function (req, res) {
    try {
        // var student = await studentController.layChiTietStudent(req.body.id);
        
        var transcript= await strancriptController.gettranscript(req.params.id)
        res.send(
            {
                transcript,
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.post('/transcriptbysubject', async function (req, res) {
    try {
        // var student = await studentController.layChiTietStudent(req.body.id);
        
        var transcript= await strancriptController.getalltranscriptbysub(req.body)
        res.send(
            {
                transcript,
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.put('/update', async function (req, res) {
    try {
        // var student = await studentController.layChiTietStudent(req.body.id);
        
        var transcript= await strancriptController.updatecomment(req.body)
        res.send(
            {
                transcript,
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.post('/', async function (req, res) {
    try {
        // var student = await studentController.layChiTietStudent(req.body.id);
        
        var transcript= await strancriptController.getalltranscript(req.body.soHieu)
        res.send(
            {
                transcript,
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.post('/mon', async function (req, res) {
    try {
        // var student = await studentController.layChiTietStudent(req.body.id);
        
        var transcript= await strancriptController.gettranscriptsub(req.body)
       
        
        
        res.send(
            {
                transcript,
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.post('/excel', async function (req, res) {
    try {
        // var student = await studentController.layChiTietStudent(req.body.id);
     
        var transcript= await strancriptController.importexcel(req.body)
        res.send(
            {
                transcript,
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.post('/create', async function (req, res) {
    try {
        // var student = await studentController.layChiTietStudent(req.body.id);
        
        var transcript= await strancriptController.inserttranscript(req.body)
        res.send(
            {
                transcript,
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})

module.exports = router;