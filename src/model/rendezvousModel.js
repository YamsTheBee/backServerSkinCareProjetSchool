
//rendezVousModel
import db from "../../db.js";

/**
 * Create a new appointment in the database.
 * @param {Object} rendezvous - Appointment data.
 * @param {number} rendezvous.user_id - User ID.
 * @param {string} rendezvous.appointment_date - Date and time of the appointment.
 * @param {string} rendezvous.soin_type - Type of service requested.
 * @param {string} rendezvous.commentaire - Optional comment or description.
 * @returns {Promise<number>} The ID of the newly created appointment.
 */
const createRendezvous = async (rendezvous) => {
	try {
		const { user_id, appointment_date, soin_type, commentaire } = rendezvous;
		const [result] = await db.query(
			"INSERT INTO rendezvous (user_id, appointment_date, soin_type, commentaire) VALUES (?, ?, ?, ?)",
			[user_id, appointment_date, soin_type, commentaire],
		);
		return result.insertId;
	} catch (error) {
		console.error("Error while creating appointment:", error);
		throw error;
	}
};

/**
 * Retrieve all appointments for a specific user.
 * @param {number} userId - User ID.
 * @returns {Promise<Array>} List of appointments.
 */
const getRendezvousByUserId = async (userId) => {
	try {
		const query = "SELECT * FROM rendezvous WHERE user_id = ?";
		const [rows] = await db.execute(query, [userId]);
		return rows;
	} catch (error) {
		console.error("Error while fetching appointments:", error);
		throw error;
	}
};

/**
 * Update an existing appointment by its ID.
 * @param {number} id - Appointment ID.
 * @param {Object} updatedData - Updated appointment data.
 * @returns {Promise<number>} Number of affected rows.
 */
const updateRendezvous = async (id, updatedData) => {
	try {
		const { appointment_date, soin_type, commentaire } = updatedData;
		const [result] = await db.query(
			"UPDATE rendezvous SET appointment_date = ?, soin_type = ?, commentaire = ? WHERE id = ?",
			[appointment_date, soin_type, commentaire, id],
		);
		return result.affectedRows;
	} catch (error) {
		console.error("Error while updating appointment:", error);
		throw error;
	}
};

/**
 * Delete an appointment by its ID.
 * @param {number} id - Appointment ID.
 * @returns {Promise<number>} Number of affected rows.
 */
const deleteRendezvous = async (id) => {
	try {
		const [result] = await db.query("DELETE FROM rendezvous WHERE id = ?", [
			id,
		]);
		return result.affectedRows;
	} catch (error) {
		console.error("Error while deleting appointment:", error);
		throw error;
	}
};

export default {
	createRendezvous,
	getRendezvousByUserId,
	updateRendezvous,
	deleteRendezvous,
};
