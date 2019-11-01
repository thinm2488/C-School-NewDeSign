var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken');
var notificationController = require('../controller/notificatonController')
var firebaseController=require('../controller/firebaseController')
var userController = require('../controller/userController')
var teacherController = require('../controller/teacherController')
router.post('/create', async (req, res) => {
    try {
      const token = req.headers['x-access-token'] || req.session.token
      //var phoneObj=jwt.decode(token)
      
      let nguoiTao = await teacherController.layChiTietTeacher(req.body.nguoiTao)
      let idFirebase =await firebaseController.insertfirebase(req.body,nguoiTao)
      let data = await notificationController.createNotification(req.body,idFirebase,nguoiTao)
      
      return res.send({
          data,
          status:200
    })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  })
  router.get('/', async function (req, res) {
    try {
        var list = await notificationController.laynoti();
        listnoti=list.listnoti
        res.send({
            status:200,
            listnoti,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.get('/firstnoti', async function (req, res) {
  try {
      var list = await notificationController.laynoti();
      noti=list.listnoti[0]
      res.send({
          status:200,
          noti,
      })
  } catch (error) {
      console.log(error)
      res.status(500).send({ errorMessage: error.message })
  }
})
router.get('/:id', async function (req, res) {
    try {
        const token =req.session.token
        phone=jwt.decode(token);
    //    var user=await userController.getUserByPhone(phone.data)
        var list = await notificationController.layChiTietNoti(req.params.id);
        noti=list.noti
        res.send({
            status:200,
            // user,
            noti,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})

router.put('/edit', async (req, res) => {
    try {
      const token =  req.session.token
    //   var phoneObj=jwt.decode(token)
    let nguoiTao = await teacherController.layChiTietTeacher(req.body.nguoiTao)
      await firebaseController.updatefirebase(req.body,nguoiTao)
      let data = await notificationController.editNotification(req.body)
      return res.send({
          data,
          status:200
    })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  })
  router.delete('/:id', async function (req, res) {
    try {
        const token = req.session.token || req.headers['x-access-token'];
        req.session.token = token;
        var noti = await notificationController.xoanoti(req.params.id);
        await firebaseController.deletefirebase(noti.users,req.params.id)
       
        res.send({
            status: 200,
            id: req.params.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }



});
  module.exports = router;
