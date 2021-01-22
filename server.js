var HTTP_PORT = process.env.PORT || 8080;

var express = require("express");
const bodyParser = require("body-parser");
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB(
	"mongodb+srv://smapro:A7fAZeST5rkVaos5@cluster0.fccty.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
);

var app = express();
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/api/restaurants", (req, res) => {
	db.getAllRestaurants(req.page, req.perPage, borough)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

app.get("/api/restaurants/:id", (req, res) => {
	db.getRestaurantById(req.params.id)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

app.post("/api/restaurants", (req, res) => {
	db.addNewRestaurant(req.body)
		.then(() => {
			res.json({ message: "success" });
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

app.put("/api/restaurants/:id", (req, res) => {
	db.updateRestaurantById(req.body)
		.then(() => {
			res.json({ message: "success" });
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

app.delete("/api/restaurants/:id", (req, res) => {
	db.deleteRestaurantById(req.params.id)
		.then(() => {
			res.json({ message: "success" });
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

db.initialize()
	.then(() => {
		app.listen(HTTP_PORT, () => {
			console.log(`server listening on: ${HTTP_PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
