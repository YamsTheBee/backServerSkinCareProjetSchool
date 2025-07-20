// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
	console.error(
		"Les variables d'environnement pour la base de données sont manquantes.",
	);
	process.exit(1);
}

const pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	port: Number(DB_PORT),
	charset: "utf8mb4", // <= Encodage-gestion des emojis et caractères spéciaux.
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// Test- connexion si pas en mode test
const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log("✅ Connexion à la base de données réussie");
		connection.release();
	} catch (err) {
		console.error("❌ Erreur de connexion à la base de données:", err.message);
		process.exit(1);
	}
};

// Évite les erreurs Jest : on teste la connexion uniquement si NODE_ENV !== "test"
if (process.env.NODE_ENV !== "test") {
	testConnection();
}

export default pool;
