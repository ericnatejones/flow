var express = require("express");
var streamRouter = express.Router();
var Stream = require("../models/stream");
var axios = require("axios");

streamRouter.route("/")
    .get((req, res) => {
        Stream.find(req.query, (err, streams) => {
            if (err) res.status(500).send(err);
            res.send(streams);
        });
    })
    .post((req, res) => {
        var url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=';
        var site = req.body.site;
        var param = '&parameterCd=00060';
        console.log(url+site+param)

        axios.get(url+site+param).then((response) => {
            console.log(response.data);

            if (!req.body.knownTitle){
                var knownTitle = response.data.value.timeSeries[0].sourceInfo.siteName
            } else {
                var knownTitle = req.body.knownTitle
            }

            var newStream = {
                apiTitle: response.data.value.timeSeries[0].sourceInfo.siteName,
                knownTitle: knownTitle,
                apiId: response.data.value.timeSeries[0].sourceInfo.siteCode[0].value
            }

            var stream = new Stream(newStream);
            stream.save((err, newStream) => {
                if (err) res.status(500).send(err);
                res.status(201).send(newStream);
            })

        }).catch((error) => {
            console.log(error)
        });
    });

streamRouter.route("/:streamId")
    .put((req, res) => {
        Stream.findByIdAndUpdate(req.params.streamId, req.body, {new: true}, (err, stream) => {
            if (err) res.status(500).send(err);
            res.send(stream);
        });
    })
    .delete((req, res) => {
        Stream.findByIdAndRemove(req.params.streamId, (err, stream) => {
            if (err) res.status(500).send(err);
            res.send(stream);
        })
    });



module.exports = streamRouter;
