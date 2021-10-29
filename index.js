//const cool = require("cool-ascii-faces");
const express = require("express");
const eta = require("eta");
//const path = require("path");

const PORT = process.env.PORT || 5000;

const { MongoClient } = require("mongodb");
const DBURI =
	"mongodb+srv://Benjamin:BenjaminMDB@bencluster.mwr39.mongodb.net/BenDatabase?retryWrites=true&w=majority";
//const DBURI = process.env.DBURI;
const client = new MongoClient(DBURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const app = express();

app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set("views", "./views");
app.get("/", (req, res) => {
	/*
	res.render("BenIndex.eta", {
		favorite: "Eta",
		name: "Ben",
		reasons: ["fast", "lightweight", "simple"],
	});
	*/

	res.render("BenIndex.eta", {
		visible: false,
		name: "Benjamin",
	});

	/*
	res.send(
		eta.render("The answer to everything is <%= it.answer %>", {
			answer: 42,
		})
	);
	*/
	//res.send("The answer to everything is");
});

// view engine setup
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");
// setup public folder
//app.use(express.static("./public"));
//app.get("/", function (req, res) {
//	res.render("pages/BenIndex.ejs");
//});

//let r;

//app.use(express.static(path.join(__dirname, "public")));
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

//app.get("/", (req, res) => res.render("./index"));
//app.get("/", (req, res) => res.render("pages/index"));

/*
app.all("/", (req, res, next) => {
	console.log("entering the middleware all() ...");
	console.log("exiting the middleware all() ...");
	next();
});
*/

/*
app.get("/", (req, res) => {
	console.log("console.log(Hello World)");
	res.send("Hello World !");
});
*/

/*
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});
*/

app.get("/db", async (req, res) => {
	try {
		client.connect(async (err) => {
			const collection = client
				.db("BenDatabase")
				.collection("BenCollection");
			// perform actions on the collection object
			await collection.find({}).toArray((err, result) => {
				if (err) throw err;
				const r = result;
				//console.log(result);
				//console.log(r);
				//document.getElementById("dbResult").innerText = result;
				res.render("BenIndex.eta", {
					visible: false,
					name: "Benjamin",
					dbdata: r,
				});
			});
			client.close();
		});
	} catch (err) {
		console.error(err);
		res.send("Error " + err);
	}
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

/*
const { Pool } = require("pg");
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});
*/

/*




express()
	.use(express.static(path.join(__dirname, "public")))
	.set("views", path.join(__dirname, "views"))
	.set("view engine", "ejs")
	.get("/", (req, res) => res.render("pages/index"))
	.get("/cool", (req, res) => res.send(cool()))
	.get("/times", (req, res) => res.send(showTimes()))
	.get("/db", async (req, res) => {
		try {
			const client = await pool.connect();
			const result = await client.query("SELECT * FROM test_table");
			const results = { results: result ? result.rows : null };
			res.render("pages/db", results);
			client.release();
		} catch (err) {
			console.error(err);
			res.send("Error " + err);
		}
	})
	.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
*/

/*

showTimes = () => {
	let result = "";
	const times = process.env.TIMES || 5;
	for (i = 0; i < times; i++) {
		result += i + " ";
	}
	return result;
};
*/
