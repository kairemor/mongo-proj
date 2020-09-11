// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({
	site_id: process.env.TURBO_APP_ID
})
const vertex = require('vertex360')({
	site_id: process.env.TURBO_APP_ID
})
const router = vertex.router()
const multer = require('multer')


const Profile = require('../models/profile')
const Repas = require('../models/repas')
const BDE = require('../models/bde')
const Basket = require('../models/basket')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname)
	}
})

const upload = multer({
	storage: storage
})
/*  This is a sample API route. */

// router.get('/:resource', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		query: req.query // from the url query string
// 	})
// })

// router.get('/:resource/:id', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		id: req.params.id,
// 		query: req.query // from the url query string
// 	})
// })

router.get('/profile', (req, res) => {
	// console.log(req); 
	const query = req.query;
	let filter = null;
	if (req.query.age != null) {
		filter = {
			age: {
				$gt: req.query.age
			}
		}
	}
	Profile.find(filter)
		.then(profiles => {
			res.setHeader('Content-Type', 'application/json');
			res.statutCode = 200;
			res.json({
				confirmation: 'success',
				data: profiles
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})
	// res.json({
	// 	confirmation:'success',
	// 	data:'this is profile route endpoint',
	// })
})

router.get('/profile/update', (req, res, next) => {
	const query = req.query
	const id = query.id
	delete query['id']

	Profile.findByIdAndUpdate(id, query, {
			new: true
		})
		.then((user) => {
			res.json({
				status: 'success',
				data: user
			})
		})
		.catch((err) => {
			res.json({
				status: 'failed',
				message: err.message
			})
		})
})
router.get('/profile/remove', (req, res) => {
	const id = req.query.id

	Profile.findByIdAndRemove(id)
		.then((prof) => {
			res.json({
				status: 'succes',
				message: 'delete succesfull',
				data: prof
			})
		})
		.catch(err => {
			res.json({
				status: 'failed',
				message: err.message
			})
		})
})

router.get('/profile/:id', (req, res, next) => {
	const id = req.params.id;
	Profile.findById(id)
		.then((profile) => {
			res.setHeader('Content-Type', 'application/json')
			res.json({
				status: 'success',
				data: profile
			})
		})
		.catch(err => {
			res.json({
				status: 'failes',
				data: []
			})
			console.log(err);
		});

});



router.post('/profile', upload.single('image'), (req, res) => {
	console.log(req.file);
	const profile = new Profile({
		fname: req.body.fname,
		lname: req.body.lname,
		position: req.body.position,
		team: req.body.team,
		age: req.body.age,
		image: req.file.filename,
	})
	profile.save()
		.then((prof) => {
			res.json({
				status: 'success',
				data: prof
			});
		})
		.catch((err) => {
			res.json({
				status: 'fail',
				message: err.message
			})
		})
})

router.get('/repas', (req, res, next) => {
	Repas.find()
		.then(repas => {
			res.json({
				set_attributes: repas
			})
		})
		.catch(err => console.log(err))
})

router.get('/repas/toText', (req, res, next) => {
	let msg = []
	Repas.find()
		.then(repas => {
			repas.forEach(element => {
				console.log()
				let ch = " \n Les repas de " + element.day + " sont : \n " + "Dejeuner : " + element.repas + "\n" + " Diner : " + element.diner + " \n \n ";
				console.log(ch);
				msg.push(ch)
			});
			res.json({
				messages: [{
					"text": msg.join(" ")
				}, ]
			})

		})
		.catch(err => console.log(err))
})

router.get('/repas/today', (req, res, next) => {
	const today = new Date();
	Repas.findOne({
			day_number: today.getDay()
		})
		.then(repas => {
			res.json({
				set_attributes: repas
			})
		})
		.catch(err => console.log(err))
})

router.get('/repas/update', (req, res, next) => {
	const query = req.query
	const day_number = query.day_number
	const day = query.day
	const id = query.id
	delete query['id']
	delete query['day_number']

	Repas.findOneAndUpdate({
			day: day
		}, query, {
			new: true
		})
		.then((user) => {
			res.json({
				status: 'success',
				data: user
			})
		})
		.catch((err) => {
			res.json({
				status: 'failed',
				message: err.message
			})
		})
})
router.post('/repas', (req, res, next) => {
	Repas.create(req.body)
		.then(repas => {
			res.json(repas)
		})
		.catch(err => console.log(err))
})


// router.get('/bde/', (res, res, next) => {
// 	BDE.find()
// 		.then(data => {
// 			res.json({
// 				set_attributes: data
// 			})
// 		})
// 		.catch(err => console.log(err))
// })

router.get('/bde', (req, res) => {
	const query = req.query;
	BDE.find(query)
		.then(data => {
			res.json({
				set_attributes: data
			})
		})
		.catch(err => console.log(err))
})
router.post('/bde', (req, res) => {
	BDE.create(req.body)
		.then(data => {
			res.json({
				set_attributes: data
			})
		})
		.catch(err => console.log(err))
})

router.get('/basket', (req, res) => {
	let msg = []
	Basket.find()
		.then(data => {
			data.forEach(element => {
				let ch = " \n " + element.Classement + " => " + element.Joueur + "  avec " + element.TOTAL + " points  \n ";
				msg.push(ch)
			});
			res.json({
				messages: [{
					"text": msg.join(" ")
				}, ]
			})
		})
})
router.post('/basket', (req, res) => {
	Basket.create(req.body)
		.then(data => {
			res.json({
				status: 'success',
				data: data
			})
		})
		.catch(err => console.log(err))
})
module.exports = router