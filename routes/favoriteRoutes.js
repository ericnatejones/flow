var express = require("express");
var favoriteRouter = express.Router();
var User = require("../models/user");
var Stream = require("../models/stream")
var jwt = require("jsonwebtoken");
var config = require("../config");

favoriteRouter.route("/param/:which/:streamId")
    .put(function(req, res){
        console.log(req.user)
        User.findOne({_id: req.user._id}, function (err, user) {
          if (err) console.log("err" + err);
          console.log("favoriteStreams: " + user.favoriteStreams);
          console.log("++++++++")
            user.favoriteStreams.forEach(function(stream){
                console.log("Success, stream" + stream.stream);
                console.log("Success, stream" + req.params.streamId);
                if (stream.stream == req.params.streamId){

                    stream[req.params.which] = req.body.param;

                    user.save(function (err, savedUser) {
                        if (err) res.status(500).send(err);
                        console.log("Successfull matched stream id's")

                        res.status(201).send(savedUser);
                    });
                }
            })
            // res.send("Stream is not favorited by user")
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
