// index.js
import dotenv from "dotenv";
import app from "./src/app.js"; // ✅ avec le bon chemin

dotenv.config();

const port = process.env.PORT || 4242;

app.listen(port, () => {
	console.log(`✅ Server running on http://localhost:${port}`);
});
