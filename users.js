const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    highScore: {
        type: Number
    },
    totalFlags: {
        type: Number
    },
    minuteHighScore: {
        type: Number
    }
})
module.exports = mongoose.model('User', userSchema);