// server.js
 const express = require("express");
 const cors = require("cors");
 const app = express();
 const path = require("path");
 const morgan = require("morgan");
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 // const config = require("./config");
 const expressJwt = require("express-jwt");

 const port = process.env.PORT || 5000;

 app.use(cors());

 app.use(morgan("dev"));
 app.use(bodyParser.json());


 app.use(express.static(path.join(__dirname, "public")));

 mongoose.connect(config.database, err => {
     if (err) throw err;
     console.log("Successfully connected to the database");
 });

 app.use("/api", expressJwt({secret: process.env.SECRET || config.secret}));

 app.use("/api/favorite", require("./routes/favoriteRoutes"));

 app.use("/stream", require("./routes/streamRoutes"));

 app.use("/auth", require("./routes/authRoutes"));

 app.listen(port, () => {
     console.log(`Server listening on port ${port}`);
 });
