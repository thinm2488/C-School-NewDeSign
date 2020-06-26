var express = require('express');
var session = require('express-session')
var router = express.Router();
var userController = require('../controller/userController');
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

router.get('/logout', async function (req, res) {
    try {
        req.session.destroy();
        res.send({
            status:200,
            mess: 'LogOut Thành công'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })

    }

})


router.get('/getall', async function (req, res) {
    try {
        var list = await userController.layuser();
        var userlist=list.listuser
        res.send({
            userlist
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
})
//test xamarin

router.get('/profile', async function (req, res) {
    try {
        const token = req.headers['x-access-token'] || req.session.token
        var phoneObj = jwt.decode(token);
        var user = await userController.getUserByPhone(phoneObj.data)
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
        var user = await userController.layChiTietUser(req.params.id);

        res.send({
            user,

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
        var user = await userController.taoUser(req.body)
        let giaoVien=await TeacherController.layChiTietTeacher(user.user.idTao);
        
        await firebaseController.insertaccount(user,giaoVien)
        //user = JSON.parse(JSON.stringify(user))
        //delete user.password;
        res.send({
            token,
            user,
           
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
        var user = await userController.importexcel(req.body,idtao);

        res.send({
            status: 200,
            token: token,
            user,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});

router.post('/signin', async function (req, res) {
    try {
        //firebasetoken=passport.createPassportConfig(req.body,req.body.soDienThoai,req.body.password,done=true);
        var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user = await userController.checkLogin(req.body);

        res.send({
            status: 200,
            token: token,
            user,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});

router.post('/xamarin/signin', async function (req, res) {
    try {
        //console.log(req.body.user);
        console.log(req.body);
        //firebasetoken=passport.createPassportConfig(req.body,req.body.soDienThoai,req.body.password,done=true);
        var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user = await userController.checkLogin(req.body);
      
        res.send({
            status: 200,
            token: token,
            user,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }

});

// router.post('/profile', async function (req, res) {
//     try {
//         const token = req.headers['x-access-token'] || req.session.token
//         var phoneObj = jwt.decode(token);
//         var user= await userController.getUserByPhone(phoneObj.data)
//         res.send({
//             status: 200,
//             user,

//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ errorMessage: error.message })

//     }
// })

router.put('/edit', async function (req, res) {

    try {
        var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user = await userController.editProfile(req.body);

        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.put('/', fileUpload(), async function (req, res) {

    try {
        var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        req.session.token = token;
        var user
        if (!req.files) {
            user = await userController.editProfile(req.body);
        }
        else {
            var file = req.files.hinh;
            req.body.hinh = file.name;
            var url = path.join(path.join(__dirname, '../../'), 'src/assets/images/');
            var url2 = path.join(path.join(__dirname, '../../'), 'dist/assets/images/');
            file.mv(url2 + req.files.hinh.name)
            file.mv(url + req.files.hinh.name, async function () {
                user = await userController.editProfile(req.body);

            })

        }
        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.post('/change-avatar', multipartMiddleware, async function (req, res) {
    const token = req.headers['x-access-token'] || req.session.token
    
 
    try {
        // var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        // req.session.token = token;
        
        if (!req.files) {
            // user = await userController.editProfile(req.body);
            return res.status(404).send(responseStatus.Code404({ errorMessage: 'Không thấy file ảnh' }))
        }
        else {
            var file = req.files.hinh;
            console.log(req)
            req.body.hinh = file.name;
           // phoneObj.hinh=req.files.hinh.name;

            var url = path.join(path.join(__dirname, '../../'), 'src/assets/images/');
            var url2 = path.join(path.join(__dirname, '../../'), 'dist/assets/images/');
            
            var oldPath = req.files.hinh.path;
            var newPath = url
            var users =await userController.editProfile(req.body);
            var user=users.user;
     
            fs.readFile(oldPath, async function (err, data) {
                fs.writeFile(url2+"/"+req.files.hinh.name, data,async function (err) {
                });
                
            });
            fs.readFile(oldPath, async function (err, data) {
                fs.writeFile(newPath+"/"+req.files.hinh.name, data,async function (err) {
                    fs.unlink(oldPath,async function () {
                        if (err) throw err;

                    });
                });
                
            });
            
            // req.files.mv(url + req.files.hinh.name, async function () {
            //     user = await userController.editProfile(req.body);

            // })

           

        }
        res.send({
            status: 200,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
// router.put('/change-password', async function (req, res) {
//     try {
//         var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
//         req.session.token = token;
//         user = await userController.changePass(req.body);
//         res.send(user)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ errorMessage: error.message })
//     }
// });

router.post('/xamarin/change-avatar', async function (req, res) {
    try {
        //var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        //req.session.token = token;
        //user = await userController.getUserByPhone(req.body.soDienThoai);
        let updateuser=await userController.updateavatar(req.body)
        if(updateuser){
            res.send({
                status: 200                
            })
        }
       
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.post('/xamarin/updateAndroidToken', async function (req, res) {
    try {
        //var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        //req.session.token = token;
        //user = await userController.getUserByPhone(req.body.soDienThoai);
        let user =await userController.updateAndroidToken(req.body)
        if(user){
            res.send({
                status: 200                
            })
        }
       
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
router.post('/change-password', async function (req, res) {
    try {
        var token = jwt.sign({ data: req.body.soDienThoai }, 'secret', { expiresIn: '1y' });
        //req.session.token = token;
        user = await userController.changePass(req.body);
        res.send({
            status: 200,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.message })
    }
});
// router.put('/passwordReset',async function(req,res){
//     try {
//         var token = jwt.sign({ data: req.body.Email }, 'secret', { expiresIn: '1y' });
//         req.session.token = token;
//         user= await userController.resetPassword(req.body,req.headers.host)

//         res.send(user);

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ errorMessage: error.message })
//     }
// })
// router.put('/resetpassword/:token',async function(req,res){
//     var email=jwt.decode(req.params.token);
//     user= await userController.changePassword(email.Email)
//     res.send(user);
// })
// router.get('/google', passport.authController('google', { scope:
//     [ 'https://www.googleapis.com/user/userinfo.email',
//       'https://www.googleapis.com/user/userinfo.profile' ] }))
//   router.get('/google/callback', function (req, res, next) {
//     passport.authenticate('google', function (err, user, info) {
//       if (err) {
//         return res.send({ errorMessage: err })
//       }
//       res.render('cinema/home', { title: 'Home', token: info.token })
//     })(req, res, next)
//   })


router.delete('/:id', async function (req, res) {
    try {
        
        var user = await userController.xoaUser(req.params.id);
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

