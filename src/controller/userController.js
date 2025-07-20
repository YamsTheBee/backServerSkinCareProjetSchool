// src/controller/userController.js
import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import { generateToken } from "../utils/generateToken.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res) => {
	const {
		email,
		username,
		password,
		firstname,
		lastname,
		phone,
		birthDate,
		newsletter,
	} = req.body;

	if (!email || !username || !password || !firstname || !lastname || !phone) {
		return res
			.status(400)
			.json({
				message:
					"Email, nom d'utilisateur, mot de passe, prénom, nom et téléphone sont requis.",
			});
	}

	if (!emailRegex.test(email)) {
		return res.status(400).json({ message: "Email invalide." });
	}

	if (password.length < 8) {
		return res
			.status(400)
			.json({
				message: "Le mot de passe doit contenir au moins 8 caractères.",
			});
	}

	try {
		const existingUser = await userModel.findUserByEmailOrUsername(
			email,
			username,
		);
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Email ou nom d'utilisateur déjà utilisé." });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = {
			email,
			username,
			password: hashedPassword,
			firstname,
			lastname,
			phone,
			birthDate,
			newsletter,
		};
		const createdUser = await userModel.createUser(newUser);

		const { password: _, ...userWithoutPassword } = createdUser;

		res
			.status(201)
			.json({
				message: "Compte créé avec succès !",
				user: userWithoutPassword,
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erreur serveur.", error: err.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Email et mot de passe sont requis." });
	}

	try {
		const user = await userModel.findUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé." });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Mot de passe incorrect." });
		}

		const token = generateToken(user);

		const { password: _, ...userWithoutPassword } = user;

		res
			.status(200)
			.json({
				message: "Connexion réussie.",
				user: userWithoutPassword,
				token,
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erreur serveur.", error: err.message });
	}
};

export const getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await userModel.findUserById(id);
		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé." });
		}

		const { password: _, ...userWithoutPassword } = user;

		res.status(200).json(userWithoutPassword);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erreur serveur.", error: err.message });
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const updatedUser = req.body;

	if (req.user.id !== id) {
		return res
			.status(403)
			.json({ message: "Vous ne pouvez modifier que votre propre profil." });
	}

	try {
		const success = await userModel.updateUserDetails(id, updatedUser);
		if (!success) {
			return res.status(404).json({ message: "Utilisateur non trouvé." });
		}
		res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erreur serveur.", error: err.message });
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (req.user.id !== id) {
		return res
			.status(403)
			.json({ message: "Vous ne pouvez supprimer que votre propre profil." });
	}

	try {
		const success = await userModel.deleteUserFromDB(id);
		if (!success) {
			return res.status(404).json({ message: "Utilisateur non trouvé." });
		}
		res.status(200).json({ message: "Utilisateur supprimé avec succès." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Erreur serveur.", error: err.message });
	}
};
