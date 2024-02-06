const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Title is require'],
        trim: true,
        maxLength: [30, 'Title must be less than 20 char'],
        unique: true
    },
    body: {
        type: String,
        requires: [true, 'Body is required'],
        trim: true,
    },
    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ]
},
    {
        timestamps: true
    });


module.exports = mongoose.model('List', listSchema);