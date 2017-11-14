favoriteRouter.route("/:streamId")
    .put(function(req, res){
        Stream.findById(req.params.streamId, function(err, stream){
          if (err) console.log(`error:${err}`);
          console.log(stream);
          req.user.favoriteStreams.stream = stream;
          User.findByIdAndUpdate(
            req.user._id,
            req.user,
            {new: true},
          ((err, user)=> {
            console.log("success")
            if (err) res.status(500).send(err);
            const streamArray = [];
            for (let i = 0; i < req.user.favoriteStreams; i++){
              Stream.findById(req.params.streamId, function(err, stream){
                if (err) console.log(`error:${err}`);
                streamArray.push(stream)
                console.log(streamArray, "<--->", req.user.favoriteStreams)
                if (streamArray === req.user.favoriteStreams){
                  res.send(streamArray);
                }
              })
            }
          })
          )

        });
    })
