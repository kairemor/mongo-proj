const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({
    TOTAL: Number,
    Classement: Number,
    Joueur: String
})

module.exports = mongoose.model('basket', basketSchema)