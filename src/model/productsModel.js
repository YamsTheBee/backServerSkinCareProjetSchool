const db = require("./db");

const findAll = async () => {
	try {
		const [products] = await db.query("select * from products;");
		return products;
	} catch (err) {
		console.error(err);
	}
};
const findOne = async (id) => {
	try {
		const [product] = await db.query("select * from products where id = ?", [
			id,
		]);

		return product;
	} catch (err) {
		console.error(err);
	}
};

module.exports = { findAll, findOne };
