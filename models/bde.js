const mongoose = require('mongoose')

const bdeSchema = mongoose.Schema({
    prenom: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
    poste: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('dbe', bdeSchema)