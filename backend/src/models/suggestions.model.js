const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },

    suggested: {
        type: [Schema.Types.ObjectId],
        ref: "Users"
    },
},
    { timestamps: true }
);


module.exports = mongoose.model("suggestions", SuggestionSchema);
