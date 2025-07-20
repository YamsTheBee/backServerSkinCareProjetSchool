import express from "express";
import cors from "cors";
import path from "node:path";
import apiRouter from "./router/index.js";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	res.on("finish", () => {
		console.log(`Response Status: ${res.statusCode}`);
	});
	next();
});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.status(200).send("API is running...");
});

app.use((req, res) => {
	res.status(404).send("Route non trouvée");
});

export default app;
