const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {

    url: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
},
    {
        timestamps: true,
    },
  
);

const subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = subscribe;
