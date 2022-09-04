const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    friends: {
        type: [Schema.Types.ObjectId]
    }
    
},
    { timestamps: true }
);


module.exports = mongoose.model("users", UserSchema);
