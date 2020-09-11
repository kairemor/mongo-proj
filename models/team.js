const Mongoose = require('mongoose')

const TeamSchema = new Mongoose.Schema({
    'name':{type:String, trim:true, default:''},
    'city':{type:String, trim:true, default:''},
})

const Team = Mongoose.model('teams', TeamSchema)

module.exports = Team 