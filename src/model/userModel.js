// const db = require("./db");

// const findOne = async (id) => {
// 	const [user] = await db.query("SELECT * FROM user Where id =?", [id]);
// 	return user;
// };

// module.exports={findOne,
// 	//  addOne
// 	}
// src/models/user.js// const db = require("./db");

// const findOne = async (id) => {
// 	const [user] = await db.query("SELECT * FROM user Where id =?", [id]);
// 	return user;
// };

// module.exports={findOne,
// 	//  addOne
// 	}
// src/models/user.js
// src/models/user.jsconst db = require("../config/db"); // Attention ici, selon ton projet peut-être '../config/db' et pas './db'
// src/models/user.js
const db = "../model/db";

// Assurez-vous que le chemin est correct
import bcrypt from "bcrypt";

// Trouver un utilisateur par email OU username
const findUserByEmailOrUsername = async (email, username) => {
	try {
		const query =
			"SELECT id, username, email FROM users WHERE email = ? OR username = ?";
		const [rows] = await db.execute(query, [email, username]);
		return rows[0]; // Retourne l'utilisateur trouvé (ou undefined)
	} catch (error) {
		console.error("Erreur lors de la recherche de l'utilisateur :", error);
		throw error;
	}
};

// Créer un nouvel utilisateur
const createUser = async (newUser) => {
	const {
		username,
		email,
		password,
		name,
		firstname,
		lastname,
		age,
		city,
		country,
		skintype,
		profile_image_url,
		phone,
		birthDate,
		newsletter,
	} = newUser;

	try {
		const existingUser = await findUserByEmailOrUsername(email, username);
		if (existingUser) {
			throw new Error("L'email ou le nom d'utilisateur existe déjà.");
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const query = `
            INSERT INTO users
            (username, email, password, name, firstname, lastname, age, city, country, skintype, profile_image_url, phone, birthDate, newsletter)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

		const [result] = await db.execute(query, [
			username,
			email,
			hashedPassword,
			name || null,
			firstname || null,
			lastname || null,
			age || null,
			city || null,
			country || null,
			skintype || null,
			profile_image_url || null,
			phone || null,
			birthDate || null,
			newsletter || null,
		]);

		if (result.affectedRows === 0) {
			throw new Error("Erreur lors de la création de l'utilisateur.");
		}
		return {
			id: result.insertId,
			username,
			email,
			name,
			firstname,
			lastname,
			age,
			city,
			country,
			skintype,
			profile_image_url,
			phone,
			birthDate,
			newsletter,
		};
	} catch (error) {
		console.error("Erreur lors de la création de l'utilisateur:", error);
		throw error;
	}
};

// Trouver un utilisateur par ID
const findUserById = async (id) => {
	try {
		const query = `
            SELECT id, username, email, name, firstname, lastname, age, city, country, skintype, profile_image_url, phone, birthDate, newsletter
            FROM users
            WHERE id = ?
        `;
		const [rows] = await db.execute(query, [id]);
		return rows[0];
	} catch (error) {
		console.error(
			"Erreur lors de la recherche de l'utilisateur par ID:",
			error,
		);
		throw error;
	}
};

// Mettre à jour les détails d'un utilisateur
const updateUserDetails = async (id, updatedUser) => {
	const {
		username,
		email,
		password,
		name,
		firstname,
		lastname,
		age,
		city,
		country,
		skintype,
		profile_image_url,
		phone,
		birthDate,
		newsletter,
	} = updatedUser;

	try {
		const existingUser = await findUserByEmailOrUsername(email, username);
		if (existingUser && existingUser.id !== id) {
			throw new Error("L'email ou le nom d'utilisateur existe déjà.");
		}

		const hashedPassword = password
			? await bcrypt.hash(password, 10)
			: undefined;

		const query = `
            UPDATE users SET
                username = ?,
                email = ?,
                password = ?,
                name = ?,
                firstname = ?,
                lastname = ?,
                age = ?,
                city = ?,
                country = ?,
                skintype = ?,
                profile_image_url = ?,
                phone = ?,
                birthDate = ?,
                newsletter = ?
            WHERE id = ?
        `;

		const [result] = await db.execute(query, [
			username,
			email,
			hashedPassword,
			name || null,
			firstname || null,
			lastname || null,
			age || null,
			city || null,
			country || null,
			skintype || null,
			profile_image_url || null,
			phone || null,
			birthDate || null,
			newsletter || null,
			id,
		]);

		return result.affectedRows > 0;
	} catch (error) {
		console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
		throw error;
	}
};

// Supprimer un utilisateur
const deleteUserFromDB = async (id) => {
	try {
		const query = "DELETE FROM users WHERE id = ?";
		const [result] = await db.execute(query, [id]);
		return result.affectedRows > 0;
	} catch (error) {
		console.error("Erreur lors de la suppression de l'utilisateur:", error);
		throw error;
	}
};

export default {
	createUser,
	findUserByEmailOrUsername,
	findUserById,
	updateUserDetails,
	deleteUserFromDB,
};
