const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    favoriteStreams: [
        {
            stream: {
              type: Schema.Types.ObjectId,
              ref: "Stream",
              unique: true
            },
            upperParam: {type: Number, default: 100000},
            lowerParam: {type: Number, default: 0}
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
