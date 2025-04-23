require("dotenv").config();
const cors = require("cors"); // Import du middleware CORS
const app = require("./src/app");

const port = process.env.PORT;

// Active CORS pour toutes les origines
app.use(cors());

app.listen(port, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log(`server address: http://localhost:${port}`);
	}
});
