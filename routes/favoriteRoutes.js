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

favoriteRouter.route("/")
    .get((req, res) => {
        User.findById(req.user._id)
            .populate("favoriteStreams.stream")
            .exec((err, user)=>{
                if (err) return res.status(500).send(err);
                res.send(user);
            })
    })
    .post((req, res) => {
      User.findByIdAndUpdate(
        req.user._id,
        {$push: {"favoriteStreams": {stream: req.body._id}}},
        {new: true}
      )
          .populate("favoriteStreams.stream")
          .exec((err, user)=>{
              if (err) return res.status(500).send(err);
              res.send(user);
          })
    })
    .delete((req, res) => {
      User.findByIdAndUpdate(
        req.user._id,
        {$pull: {"favoriteStreams": {stream: req.body._id}}},
        {new: true}
      )
          .populate("favoriteStreams.stream")
          .exec((err, user)=>{
              if (err) return res.status(500).send(err);
              res.send(user);
          })
    })


module.exports = favoriteRouter;
