const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    status: {
        type: Number
    }
    
},
    { timestamps: true }
);


module.exports = mongoose.model("friendRequest", FriendRequestSchema);
