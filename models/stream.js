var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var streamSchema = new Schema({
    apiTitle: {
        type: String,
        required: true
    },
    knownTitle: {
        type: String,
        default: this.apiTitle
    },
    apiId: {
        type: Number,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("Stream", streamSchema);
