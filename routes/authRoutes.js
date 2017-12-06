const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcrypt")

authRoutes.post("/login", (req, res) => {

    // Try to find the user with the submitted username
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) return res.status(500).send(err);

        // If that user isn't in the database:
        if (!user) {
            return res.status(401).send({success: false, message: "User with the provided username was not found"})
        } else if (user) {

          bcrypt.compare(req.body.password, user.password, function(err, isResolved) {
            if(isResolved){
              let token = jwt.sign(user.toObject(), process.env.SECRET || config.secret);
              // Send the token back to the client app.
              return res.send({token: token, user: user.toObject(), success: true, message: "Here's your token!"})
            } else {
              return res.status(401).send({success: false, message: "Incorrect password"})
              }
          });


        }
    });
});

authRoutes.post("/signup", (req, res) => {
    User.find({username: req.body.username}, (err, existingUser) => {
        if (err) return res.status(500).send(err);
        if (existingUser.length){
          return res.status(401).send({success: false, message: "That username is already taken."});
        } else {
            let newUser = new User(req.body);
            bcrypt.hash(newUser.password, 3, function(err, hash){
              console.log("hash", hash)
              newUser.password = hash;
              newUser.save((err, userObj) => {
                  console.log("userObj", userObj)
                  if (err) return res.status(500).send(err);
                  return res.send({user: userObj, message: "Successfully created new user.", success: true});
              });
            })
        }
    })
});

module.exports = authRoutes;
