var express = require("express");
var favoriteRouter = express.Router();
var User = require("../models/user");
var Stream = require("../models/stream")
var jwt = require("jsonwebtoken");
var config = require("../config");

favoriteRouter.route("/param/:which/:streamId")
    .put(function(req, res){
        console.log(req.user)
        User.find({_id: req.user._id}, function (err, user) {
          if (err) console.log("err" + err);
          console.log("favoriteStreams" + user);
          console.log("++++++++")
            user.favoriteStreams.forEach(function(stream){
                console.log("Success, stream" + stream);
                if (stream._id === req.param.streamId){
                    stream[req.param.which] === req.body.param;
                    user.save(function (err, savedUser) {
                        if (err) res.status(500).send(err);
                        res.status(201).send(savedUser);
                    });
                }
            })
            res.send("Stream is not favorited by user")
        });
    })

favoriteRouter.route("/:streamId")
    .put(function(req, res){
        Stream.findById(req.params.streamId, function(err, stream){
          if (err) console.log(`error:${err}`);

          console.log(req.user.favoriteStreams);

          req.user.favoriteStreams.push({stream: stream});

          console.log(req.user.favoriteStreams)
          User.findByIdAndUpdate(req.user._id, req.user, {new: true}, function (err, user) {
            console.log("success")
              if (err) res.status(500).send(err);
              res.send(user);
          });
        });

    })



module.exports = favoriteRouter;
