const express = require("express");
const favoriteRouter = express.Router();
const User = require("../models/user");
const Stream = require("../models/stream")
const jwt = require("jsonwebtoken");
const config = require("../config");

favoriteRouter.route("/param/:which/:streamId")
    .put(function(req, res){
        User.findById(req.user._id, (err, user) => {
            let stream = user.favoriteStreams.id(req.params.streamId);
            console.log(stream);
            stream[req.params.which] = req.body.param
            user.save(function (err, savedUser) {
                if (err) res.status(500).send(err);
                console.log("Successfull matched stream id's")

                res.status(201).send(savedUser);
            });
        })
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
favoriteRouter.route("/")
    .get((req, res) => {
        User.findOne({_id: req.user._id})
            .populate("favoriteStreams")
            .exec((err, user)=>{
                if (err) return handleError(err);
                Stream.populate(user.favoriteStreams, {
                    path: 'stream',
                    model: 'Stream'
                }, err => {
                    res.send(user.favoriteStreams);
                })
            })
    })

module.exports = favoriteRouter;
