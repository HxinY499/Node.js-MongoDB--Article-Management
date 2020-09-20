var express = require('express');
var router = express.Router();
var workModel = require("../models/work.js")
var moment = require("moment")

//渲染主界面
router.get('/', function(req, res, next) {
    var username = req.session.username
    var page = req.query.page || 1
    var pageSize = 5
    var data = []
    var index = 0
    workModel.find({}, function(err, docs) {
        var total = Math.ceil(docs.length / pageSize)
        for (let i = 0; i < total; i++) {
            data[i] = []
            for (let k = 0; k < pageSize; k++) {
                if (docs[index] === undefined) {
                    break
                } else {
                    data[i][k] = docs[index]
                    index += 1
                }
            }
        }
        if (data[page - 1] != undefined) {

            for (let i = 0; i < data[page - 1].length; i++) {
                data[page - 1][i].time = moment(Number(data[page - 1][i].time)).format('YYYY-MM-DD HH:mm:ss')
            }
            res.render('index.ejs', { username: username, list: data[page - 1], total: total, page: page });

        } else if (data[page - 1] === undefined && page > 1) {
            res.redirect("/?page" + (page - 1))
        } else {
            res.render("index.ejs", {
                username: username,
                list: [],
                total: total,
                page: page
            })
        }

    })

});

//渲染注册界面
router.get('/register', function(req, res, next) {
    res.render('register.ejs', {});
});

//渲染登录界面
router.get('/login', function(req, res, next) {
    res.render('login.ejs', {});
});

//退出登录，返回到登录界面
router.get('/off', function(req, res, next) {
    req.session.username = null
    res.redirect("/login")
});

//渲染工作界面
router.get('/do', function(req, res, next) {
    var username = req.session.username
    var id = req.query.id
    var page = req.query.page
    var data = {}
    if (id) {
        workModel.findOne({ _id: id }, function(err, doc) {
            if (err) {
                res.redirect("/do?id=" + id + "&page=" + page)
            } else {
                data.title = doc.title
                data.content = doc.content
                data.id = id
                data.page = page
            }
            res.render('work.ejs', { username: username, data: data });
        })
    } else {
        res.render('work.ejs', { username: username, data: {} });
    }
});

module.exports = router;