var express = require("express");
var streamRouter = express.Router();
var Stream = require("../models/stream");

streamRouter.route("/")
    .get(function (req, res) {
        Stream.find(req.query, function (err, streams) {
            if (err) res.status(500).send(err);
            res.send(streams);
        });
    })
    .post(function (req, res) {
        var stream = new Stream(req.body);
        stream.save(function (err, newStream) {
            if (err) res.status(500).send(err);
            res.status(201).send(newStream);
        })
    });

streamRouter.route("/:streamId")
    .put(function (req, res) {
        Stream.findByIdAndUpdate(req.params.streamId, req.body, {new: true}, function (err, stream) {
            if (err) res.status(500).send(err);
            res.send(stream);
        });
    })
    .delete(function (req, res) {
        Stream.findByIdAndRemove(req.params.streamId, function (err, stream) {
            if (err) res.status(500).send(err);
            res.send(stream);
        })
    });



module.exports = streamRouter;
