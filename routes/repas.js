const express = require('express')
const router = express.Router()
const Repas = require('../models/repas')

router.get('/repas', (req, res, next) => {
    Repas.find()
        .then(repas => {
            res.json(repas)
        })
        .catch(err => console.log(err))
})

router.post('/repas', (req, res, next) => {
    Repas.create(req.body)
        .then(repas => {
            res.json(repas)
        })
        .catch(err => console.log(err))
})
router.get('/repas/today', (req, res, next) => {
    const today = new Date();
    Repas.findOne({
            day_number: today.getDay()
        })
        .then(repas => {
            res.json(repas)
        })
        .catch(err => console.log(err))
})

module.exports = router