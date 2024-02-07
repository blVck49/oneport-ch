const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {

        title: {
            type: String,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    },

);

const task = mongoose.model("Task", taskSchema);

module.exports = task;
