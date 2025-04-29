const db = require("./db");
// CRUD

// Récupérer les rendez-vous par user_id
exports.getRendezvousByUserId = async (userId) => {
	const query = "SELECT * FROM rendezvous WHERE user_id = ?";
	const [rows] = await db.execute(query, [userId]);
	return rows;
};

// CREATE un rendez-vous
const createRendezvous = async (rendezvous) => {
	const { user_id, date, heure, motif } = rendezvous;
	const [result] = await db.query(
		"INSERT INTO rendezvous (user_id, date, heure, motif) VALUES (?, ?, ?, ?)",
		[user_id, date, heure, motif],
	);
	return result.insertId;
};

// READ - Récupère les rendez-vous d'un utilisateur
const getRendezvousByUserId = async (userId) => {
	const [rows] = await db.query("SELECT * FROM rendezvous WHERE user_id = ?", [
		userId,
	]);
	return rows;
};

// UPDATE - Modifier un rendez-vous
const updateRendezvous = async (id, updatedData) => {
	const { date, heure, motif } = updatedData;
	const [result] = await db.query(
		"UPDATE rendezvous SET date = ?, heure = ?, motif = ? WHERE id = ?",
		[date, heure, motif, id],
	);
	return result.affectedRows;
};

// DELETE - Supprimer un rendez-vous
const deleteRendezvous = async (id) => {
	const [result] = await db.query("DELETE FROM rendezvous WHERE id = ?", [id]);
	return result.affectedRows;
};

module.exports = {
	createRendezvous,
	getRendezvousByUserId,
	updateRendezvous,
	deleteRendezvous,
};
