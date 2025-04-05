// const db = require("../model/db");
const { findAll, findOne } = require("../model/productsModel");

const browse = async (req, res) => {
	try {
		const products = await findAll();
		res.status(200).json(products);
	} catch (err) {
		console.error(err);
		res.sendStaus(500);
	}
};

const read = async (req, res) => {
	try {
		if (isNaN(req.params.id)) {
			throw new Error();
		}
		const productId = parseInt(req.params.id, 10);
		const product = await findOne(productId);
		console.log(product);
	} catch (err) {
		console.error(err);
		res.sendStaus(500);
	}
};
module.exports = { browse, read };
