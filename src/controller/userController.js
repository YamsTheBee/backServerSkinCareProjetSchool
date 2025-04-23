// const { findOne, addOne } = require("../model/productsModel");

// const getOne = async (req, res) => {
// 	const userId = parseInt(req.params.id, 1);
// 	console.log(userId);
// 	try {
// 		if (isNaN(userId)) {
// 			throw new Error();
// 		}
// 		const [user] = await findOne(userId);
// 		res.status(200).json(user);
// 	} catch (error) {
// 		res.sendSataus(500);
// 	}
// };

// const createOne = async (req, res) => {
// 	const newUser = req.body;
// 	console.log("je suis sur la route createOne", newUser);

// 	const errors = ValidateUser(newUser);
// 	if (errors) {
// 		return res.status(401).send(errors);
// 	}

// 	//has le mdp
// 	// biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: <explanation>
// 	const hashedPassword = await hashedPassword(newUser.pass);
// 	//console.log({"newUser, pass: hashedPassWord})
// 	const result = await addOne({ ...newUser, pass: hashedPassword });
// 	res.status(201).send(result);
// };
// module.exports = { getOne, createOne };
const bcrypt = require("bcrypt");

const {
	createUser,
	updateUserDetails,
	deleteUserFromDB,
	findUserById,
	findUserByEmailOrUsername, // Nouvelle fonction pour vérifier l'existence d'un email/username
} = require("../model/userModel");

// Inscription d'un utilisateur
const register = async (req, res) => {
	try {
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
		} = req.body;

		// Vérifie que tous les champs sont fournis
		if (!username || !email || !password) {
			return res
				.status(400)
				.send("Username, email, and password are required.");
		}

		// Vérifie si l'email ou le username existe déjà
		const existingUser = await findUserByEmailOrUsername(email, username);
		if (existingUser) {
			return res
				.status(400)
				.send(
					"Un utilisateur avec ce même email ou ce nom d'utilisateur existe déjà.",
				);
		}

		// Hash du mot de passe
		const hashedPassword = await bcrypt.hash(password, 10);

		// Crée un nouvel utilisateur avec les nouveaux champs
		const newUser = {
			username,
			email,
			password: hashedPassword,
			name,
			firstname,
			lastname,
			age,
			city,
			country,
			skintype,
			profile_image_url,
		};

		const createdUser = await createUser(newUser);

		res.status(201).json(createdUser);
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};
// Modifier un utilisateur
const updateUser = async (req, res) => {
	try {
		const userId = Number.parseInt(req.params.id, 10);
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
		} = req.body;

		if (Number.isNaN(userId)) {
			return res.status(400).send("ID invalide.");
		}

		if (!username || !email) {
			// Tu n'as pas besoin de vérifier le mot de passe ici
			return res.status(400).send("Username and email are required.");
		}

		// Si un mot de passe est fourni, hashé, sinon, on garde le mot de passe actuel
		let hashedPassword;
		if (password) {
			hashedPassword = await bcrypt.hash(password, 10);
		}

		// Crée un objet mis à jour avec ou sans mot de passe
		const updatedUser = {
			username,
			email,
			password: hashedPassword || undefined, // Si pas de mot de passe, ne pas inclure ce champ
			name,
			firstname,
			lastname,
			age,
			city,
			country,
			skintype,
			profile_image_url,
		};

		// Mise à jour de l'utilisateur
		const updated = await updateUserDetails(userId, updatedUser);

		if (!updated) {
			return res.status(404).send("Utilisateur non trouvé.");
		}

		// Envoie un message de succès avec l'utilisateur mis à jour
		res.status(200).json({
			message: "Utilisateur mis à jour avec succès ✅",
			user: updatedUser,
		});
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
	try {
		const userId = Number.parseInt(req.params.id, 10);

		if (Number.isNaN(userId)) {
			return res.status(400).send("ID invalide.");
		}

		const deleted = await deleteUserFromDB(userId);
		if (!deleted) {
			return res.status(404).send("Utilisateur non trouvé.");
		}

		res.status(204).send(); // Succès sans contenu
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

// Obtenir un utilisateur
const getUser = async (req, res) => {
	try {
		const userId = Number.parseInt(req.params.id, 10);

		if (Number.isNaN(userId)) {
			return res.status(400).send("ID invalide.");
		}

		const user = await findUserById(userId);
		if (!user) {
			return res.status(404).send("Utilisateur non trouvé.");
		}

		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

module.exports = { register, updateUser, deleteUser, getUser };
