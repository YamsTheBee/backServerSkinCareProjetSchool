// const db = require("../model/db");
const { findAll } = require("../model/productsModel");
const browse = async (req, res) => {
	try {
		const products = await findAll();
		res.status(200).json(products);
	} catch (err) {
		res.sendStaus(500);
	}
};

module.exports = { browse };
