// const db = require("./db");

// const findAll = async () => {
// 	try {
// 		const [products] = await db.query("select * from products;");
// 		return products;
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
// const findOne = async (id) => {
// 	try {
// 		const [product] = await db.query("select * from products where id = ?", [
// 			id,
// 		]);

// 		return product;
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// module.exports = { findAll, findOne };
const db = require("./db");

// Récupérer tous les produits
const findAll = async () => {
	try {
		const [products] = await db.query("SELECT * FROM products;");
		return products;
	} catch (err) {
		console.error(err);
		throw new Error("Erreur lors de la récupération des produits");
	}
};

// Récupérer un produit spécifique par son ID
const findOne = async (id) => {
	try {
		const [products] = await db.query("SELECT * FROM products WHERE id = ?", [
			id,
		]);

		if (products.length === 0) {
			return null; // Aucun produit trouvé
		}

		return products[0]; // Retourne le premier produit trouvé
	} catch (err) {
		console.error(err);
		throw new Error("Erreur lors de la récupération du produit");
	}
};

// Ajouter un produit
const create = async (product) => {
	const { name, description, price, product_type, product_url } = product;
	try {
		const [result] = await db.query(
			"INSERT INTO products (name, description, price, product_type, product_url) VALUES (?, ?, ?, ?, ?)",
			[name, description, price, product_type, product_url],
		);
		return result.insertId; // Retourne l'ID du produit ajouté
	} catch (err) {
		console.error(err);
		throw new Error("Erreur lors de la création du produit");
	}
};

// Mettre à jour un produit
const update = async (id, product) => {
	const { name, description, price, product_type, product_url } = product;
	try {
		await db.query(
			"UPDATE products SET name = ?, description = ?, price = ?, product_type = ?, product_url = ? WHERE id = ?",
			[name, description, price, product_type, product_url, id],
		);
	} catch (err) {
		console.error(err);
		throw new Error("Erreur lors de la mise à jour du produit");
	}
};

// Supprimer un produit
const remove = async (id) => {
	// Renommé de deleteOne à remove
	try {
		await db.query("DELETE FROM products WHERE id = ?", [id]);
	} catch (err) {
		console.error(err);
		throw new Error("Erreur lors de la suppression du produit");
	}
};

module.exports = { findAll, findOne, create, update, remove }; // Renommé ici aussi
