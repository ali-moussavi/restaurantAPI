/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Seyed Mohammad Ali Lohmousavi Student ID: 159309186 Date: 1/22/2021
 * Heroku Link: https://web422assignmnt.herokuapp.com/
 *
 ********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;

var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB(
	"mongodb+srv://smapro:A7fAZeST5rkVaos5@cluster0.fccty.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
);

var app = express();
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.json({ message: "API Listening" });
});

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
