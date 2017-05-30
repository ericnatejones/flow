var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var streamSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Stream", streamSchema);
