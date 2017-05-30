var express = require("express");
var favoriteRouter = express.Router();
var User = require("../models/user");
var Stream = require("../models/stream")
var jwt = require("jsonwebtoken");
var config = require("../config");

favoriteRouter.route("/:streamId")
    .put(function(req, res){
        var stream = Stream.findById(req.params.streamId);

        req.user.favoriteStreams.push(stream);
        console.log(req.user);

        User.findByIdAndUpdate(req.user._id, req.user, {new: true}, function (err, user) {
            if (err) res.status(500).send(err);
            res.send(user);
        });
    })

favoriteRouter.route("param/:which/:streamId")
    .put(function(req, res){
        var stream = Stream.findById(req.params.streamId);

        req.user.favoriteStreams.push(stream);
        console.log(req.user);

        User.findByIdAndUpdate(req.user._id, req.user, {new: true}, function (err, user) {
            if (err) res.status(500).send(err);
            res.send(user);
        });
    })

module.exports = favoriteRouter;
