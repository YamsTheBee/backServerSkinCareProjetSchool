// src/controller/productsController.js
import {
	findAll,
	findOne,
	create as createProduct,
	update as updateProduct,
	remove as removeProduct,
} from "../model/productsModel.js";

const browse = async (req, res) => {
	try {
		const products = await findAll();
		res.status(200).json(products);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erreur interne du serveur.");
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
			return res.status(404).send("Produit non trouvé.");
		}
		res.status(200).json(product);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erreur interne du serveur.");
	}
};

const create = async (req, res) => {
	try {
		const { name, description, price, product_type, product_url } = req.body;

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
		const insertId = await createProduct(newProduct);
		const createdProduct = await findOne(insertId);
		res.status(201).json(createdProduct);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erreur interne du serveur.");
	}
};

const update = async (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id, 10);
		if (Number.isNaN(productId)) {
			return res.status(400).send("L'ID fourni est invalide.");
		}

		const { name, description, price, product_type, product_url } = req.body;

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
		await updateProduct(productId, updatedProduct);
		const updatedProductDetails = await findOne(productId);
		res.status(200).json(updatedProductDetails);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erreur interne du serveur.");
	}
};

const remove = async (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id, 10);
		if (Number.isNaN(productId)) {
			return res.status(400).send("L'ID fourni est invalide.");
		}
		await removeProduct(productId);
		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).send("Erreur interne du serveur.");
	}
};

export default { browse, read, create, update, remove };
