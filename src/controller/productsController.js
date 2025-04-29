const {
	findAll,
	findOne,
	create: createProduct,
	update: updateProduct,
	remove: removeProduct,
} = require("../model/productsModel"); // Importation unique et correcte

const browse = async (req, res) => {
	try {
		const products = await findAll();
		res.status(200).json(products);
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

const read = async (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id, 10);
		if (Number.isNaN(productId)) {
			return res.status(400).send("L'ID fourni est invalide.");
		}
		const product = await findOne(productId);
		if (!product) {
			return res.status(404).send("Produit non trouvé");
		}
		res.status(200).json(product);
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

const create = async (req, res) => {
	try {
		const { name, description, price, product_type, product_url } = req.body;

		// Vérification des champs requis
		if (!name) return res.status(400).send("Le champ 'name' est requis.");
		if (!description)
			return res.status(400).send("Le champ 'description' est requis.");
		if (!price || Number.isNaN(price))
			return res
				.status(400)
				.send("Le champ 'price' est requis et doit être un nombre.");
		if (!product_type)
			return res.status(400).send("Le champ 'product_type' est requis.");
		if (!product_url)
			return res.status(400).send("Le champ 'product_url' est requis.");

		const newProduct = { name, description, price, product_type, product_url };
		const insertId = await createProduct(newProduct); // Crée le produit
		const createdProduct = await findOne(insertId); // Récupère le produit complet
		res.status(201).json(createdProduct); // Renvoie le produit créé
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

const update = async (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id, 10);

		if (Number.isNaN(productId)) {
			return res.status(400).send("L'ID fourni est invalide.");
		}

		const { name, description, price, product_type, product_url } = req.body;

		// Vérification des champs requis
		if (!name) return res.status(400).send("Le champ 'name' est requis.");
		if (!description)
			return res.status(400).send("Le champ 'description' est requis.");
		if (!price || Number.isNaN(price))
			return res
				.status(400)
				.send("Le champ 'price' est requis et doit être un nombre.");
		if (!product_type)
			return res.status(400).send("Le champ 'product_type' est requis.");
		if (!product_url)
			return res.status(400).send("Le champ 'product_url' est requis.");

		const updatedProduct = {
			name,
			description,
			price,
			product_type,
			product_url,
		};
		await updateProduct(productId, updatedProduct); // Mise à jour du produit
		const updatedProductDetails = await findOne(productId); // Récupère le produit mis à jour
		res.status(200).json(updatedProductDetails); // Renvoie le produit mis à jour
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

const remove = async (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id, 10);

		if (Number.isNaN(productId)) {
			return res.status(400).send("L'ID fourni est invalide.");
		}

		// Supprimer le produit
		await removeProduct(productId);
		res.status(204).send(); // Suppression réussie, renvoie une réponse vide
	} catch (err) {
		console.error(err);
		res.sendStatus(500); // Erreur serveur interne
	}
};

module.exports = { browse, read, create, update, remove };
