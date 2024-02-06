const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true, 
    },
    username: {
        type: String,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    spy:{
        type: String,
    },
    list: [
        {
            type: mongoose.Types.ObjectId,
            ref: "List",
        }
    ]
},
    {
        timestamps: true
    });

// Middleware to lowercase email before saving
userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    next();
});

module.exports = mongoose.model('User', userSchema);
