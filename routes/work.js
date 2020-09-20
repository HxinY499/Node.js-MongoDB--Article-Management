var express = require('express');
var router = express.Router();
var workModel = require("../models/work.js")
var moment = require("moment")

//添加文章/修改文章
router.post("/add", function(req, res, next) {
    var id = req.body.id
    if (id) {
        //修改文章
        var page = req.body.page
        var title = req.body.title
        var content = req.body.content
        workModel.update({ _id: id }, { $set: { title: title, content: content } }, function(err, result) {
            if (err) {
                res.redirect("/do?id=" + id + "&page=" + page)
            } else {
                res.redirect("/?page=" + page)
            }
        })
    } else {
        //添加文章
        var data = {
            title: req.body.title,
            content: req.body.content,
            time: Date.now(),
            username: req.session.username
        }
        if (data.username != null) {
            workModel.create(data, function(err, doc) {
                if (err) {
                    res.redirect("/do")
                }
            })
        }
        res.redirect("/")
    }
})

//删除文章
router.get("/delete", function(req, res, next) {
    var page = req.query.page
    var id = req.query.id
    workModel.deleteOne({ _id: id }, function() {
        res.redirect("/?page=" + page)
    })
})

//详情页面
router.get("/details", function(req, res, next) {
    var id = req.query.id
    username = req.session.username
    var data = {}
    workModel.findOne({ _id: id }, function(err, doc) {
        if (err) {
            res.end()
        } else {
            data.title = doc.title
            data.content = doc.content
            data.username = doc.username
            data.time = moment(Number(doc.time)).format('YYYY-MM-DD HH:mm:ss')
            res.render("details.ejs", { username: username, data: data })
        }
    })
})

module.exports = router