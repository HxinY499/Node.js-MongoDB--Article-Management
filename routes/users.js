var express = require('express');
var router = express.Router();
var userModel = require("../models/user.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//注册
router.post('/register', function(req, res, next) {
    var username = req.body.username
    var password1 = req.body.password1
    var password2 = req.body.password2
    if (password1 === password2) {
        userModel.findOne({ username: username }, function(err, doc) {
            if (!err) {
                if (doc === null) {
                    userModel.create({ username: username, password: password1 }, function(err, doc) {
                        if (!err) {
                            res.redirect("/login")
                        } else {
                            // alert("注册失败")
                            res.redirect("/register")
                        }
                    })
                } else {
                    // alert("该用户名已存在")
                    res.redirect("/register")
                }
            } else {
                // alert("注册失败")
                res.redirect("/register")
            }
        })
    } else {
        // alert("确认密码不一致")
        res.redirect("/register")
    }
});


//登录
router.post('/login', function(req, res, next) {
    var username = req.body.username
    var password = req.body.password1
    userModel.findOne({ username: username, password: password }, function(err, doc) {
        if (err) {
            // alert("登录失败")
            res.redirect("/login")
        }
        if (doc != null) {
            // console.log(username + password)
            req.session.username = username
            res.redirect("/")
        } else {
            // alert("用户名不存在")
            res.redirect("/login")
        }
    })
});


module.exports = router;