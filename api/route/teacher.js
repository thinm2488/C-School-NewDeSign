var express = require('express');
var session = require('express-session')
var router = express.Router();
var TeacherController = require('../controller/teacherController');
var firebaseController = require('../controller/firebaseController');
// var authController = require('../controller/authController');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const path = require('path');
// var passport = require('../controller/passport').passport
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var mv = require('mv');
//var authenticate = require('google-auth-library');
var fs = require('fs');

// router.get('/logout', async function (req, res) {
//     try {
//         req.session.destroy();
//         res.send({
//             status:200,
//             mess: 'LogOut Thành công'
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ errorMessage: error.message })

//     }

// })


router.get('/getall', async function (req, res) {
    try {
        var list = await TeacherController.layTeacher();
        var teacher=list.listTeacher
        res.send({
            teacher
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
router.get('/profile', async function (req, res) {
    try {
        const token = req.headers['x-access-token'] || req.session.token
        var phoneObj = jwt.decode(token);
        var user = await TeacherController.getTeacherByPhone(phoneObj.data)
        res.send({
            status: 200,
            user,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }
})
router.get('/signout', async function (req, res) {
    const token = req.headers['x-access-token'] || req.session.token


    if (token) {
        delete req.session.user
        delete req.session.token
        res.status(200).json({
            messsage: 'Đăng xuất thành công',
            status: 200

        });
    }
    else {
        res.send({
            errorMessage,
            status: 404
        })
    }
})
router.get('/:id', async function (req, res) {
    try {
        var user = await TeacherController.layChiTietTeacher(req.params.id);
        var teacher=user.user
        res.send({
            teacher,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }

})
router.post('/signup', async function (req, res) {
    try {
        //? lai con de x-acess-token vao khong

        var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        //req.session.token = token;
        var user = await TeacherController.taoTeacher(req.body)
        var teacher=user.teacher
       
        //user = JSON.parse(JSON.stringify(user))
        //delete user.password;
        res.send({
            token,
            teacher,
            status:200
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }


});
router.post('/excel', async function (req, res) {
    try {
        //firebasetoken=passport.createPassportConfig(req.body,req.body.soDienThoai,req.body.password,done=true);
        
        const token = req.session.token
        var phoneObj = jwt.decode(token);
        var idtao = await TeacherController.getTeacherByPhone(phoneObj.data)
        var teacher = await TeacherController.importexcel(req.body,idtao);
        res.send({
            status: 200,
            token: token,
            teacher,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.post('/excelphancong', async function (req, res) {
    try {
        //firebasetoken=passport.createPassportConfig(req.body,req.body.soDienThoai,req.body.password,done=true);
        
        const token = req.session.token
        var phoneObj = jwt.decode(token);
        var teacher = await TeacherController.importexcelphancong(req.body);
        res.send({
            status: 200,
            token: token,
            teacher,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});

router.put('/edit', async function (req, res) {

    try {
        var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user = await TeacherController.editProfile(req.body);

        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});




router.delete('/:id', async function (req, res) {
    try {
        
        var user = await TeacherController.xoaTeacher(req.params.id);
        res.send({
            user,
            id: req.params.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }



});

module.exports = router;

