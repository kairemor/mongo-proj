// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({
	site_id: process.env.TURBO_APP_ID
});
const vertex = require("vertex360")({
	site_id: process.env.TURBO_APP_ID
});
const router = vertex.router();
const Profile = require('../models/profile')

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get("/", (req, res) => {
	res.render("home", {
		title: "Bienvenue : Page de Gestion de polytechbot",
	});

});
router.get("/profile", (req, res) => {
	Profile.findOne(req.query)
		.then(profile => {
			res.render("profile", {
				text: 'c"est une texe dans le render',
				profile: profile
			});
		})
});
router.get("/restau", (req, res) => {
	res.render("restau", {
		title: "Restauration"
	});

});

router.get('/basket', (req, res) => {
	res.render('basket', {
		title: "Basket"
	})
})

router.get('/taximan', (req, res) => {
	res.render('taximan', {
		title: "Gestion numero de taxima"
	})
})

/*  This route render json data */
router.get("/json", (req, res) => {
	res.json({
		confirmation: "success",
		app: process.env.TURBO_APP_ID,
		data: "this is a sample json route."
	});
});

/*  This route sends text back as plain text. */
router.get("/send", (req, res) => {
	res.send("This is the Send Route");
});

/*  This route redirects requests to Turbo360. */
router.get("/redirect", (req, res) => {
	res.redirect("https://www.turbo360.co/landing");
});

module.exports = router;