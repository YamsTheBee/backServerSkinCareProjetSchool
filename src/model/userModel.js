// const db = require("./db");

// const findOne = async (id) => {
// 	const [user] = await db.query("SELECT * FROM user Where id =?", [id]);
// 	return user;
// };

// module.exports={findOne,
// 	//  addOne
// 	}
const bcrypt = require("bcrypt");
const db = require("./db");

// Créer un utilisateur avec mot de passe hashé
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
	} = newUser;

	// Hash du mot de passe avant d'insérer dans la base de données
	const hashedPassword = await bcrypt.hash(password, 10);

	// Requête d'insertion en prenant en compte tous les champs définis dans la base de données
	const query = `
    INSERT INTO users 
    (username, email, password, name, firstname, lastname, age, city, country, skintype, profile_image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
	]);

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
	};
};

// Mettre à jour les détails d'un utilisateur (en incluant le hashage du mot de passe)
const updateUserDetails = async (userId, updatedUser) => {
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
	} = updatedUser;

	// Hash du mot de passe avant d'enregistrer dans la base de données
	const hashedPassword = await bcrypt.hash(password, 10);

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
      profile_image_url = ? 
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
		userId,
	]);

	return result.affectedRows > 0;
};

// Supprimer un utilisateur
const deleteUserFromDB = async (userId) => {
	const query = "DELETE FROM users WHERE id = ?";
	const [result] = await db.execute(query, [userId]);
	return result.affectedRows > 0;
};

// Trouver un utilisateur par son ID
const findUserById = async (userId) => {
	const query = "SELECT * FROM users WHERE id = ?";
	const [user] = await db.execute(query, [userId]);
	return user[0];
};

// Trouver un utilisateur par son email ou username (pour éviter les doublons)
const findUserByEmailOrUsername = async (email, username) => {
	const query = "SELECT * FROM users WHERE email = ? OR username = ?";
	const [user] = await db.execute(query, [email, username]);
	return user[0];
};

module.exports = {
	createUser,
	updateUserDetails,
	deleteUserFromDB,
	findUserById,
	findUserByEmailOrUsername,
};
