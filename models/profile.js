const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        default: ''
    }, // trim allow to skip the space in a other way delete all no useful espace
    lname: {
        type: String,
        trim: true,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    team: {
        type: String,
        trim: true,
        default: ''
    },
    position: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        trim: true,
        default: ''
    },
});

const Profile = mongoose.model('profiles', ProfileSchema);

module.exports = Profile;