const express = require("express");
const cors = require("cors");
const router = require("./router"); //ou  import router from ("./router")
const rendezvousRoutes = require("./router/rendezvousRouter");
const usersRouter = require("./router/userRouter"); // 🔥 à ajouter
const productsRouter = require("./router/productsRouter");

const app = express();

// ✅ Configuration CORS personnalisée
app.use(
	cors({
		origin: "http://localhost:5173", // Remplace si ton frontend tourne sur un autre port
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true, // Si tu comptes utiliser des cookies ou headers d'authentification
	}),
);

app.use(express.json());

// get http://localhost:4242/
app.get("/", (req, res) => {
	res.status(200).send("je suis sur l'api <3'http://localhost:4242/");
});

app.use("/api/users", usersRouter); // ✅ ceci rend /api/users/register accessible
app.use("/api/rendezvous", rendezvousRoutes);
app.use("/api", router);
app.use("/api/products", productsRouter);
// Routes
// // Lancer l'API
// app.get("/", (req, res) => {
// 	res.status(200).send("API is running...");
// });

module.exports = app;
