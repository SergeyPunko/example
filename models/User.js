const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    accounts:{
        type: String,
        enum: ['local', 'github', 'google', 'facebook'],
        required:true
    },
    local:{
        username: {
            type: String,
        },
        mail: {
            type: String,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
        }
    },
    github: { 
        id:{type: String},
        name:{type: String}
    },
    google: {
        id:{type: String},
        name:{type: String}
    },
    facebook: {
        id:{type: String},
        name:{type: String}
    }
})

module.exports = User = mongoose.model('User', UserSchema);