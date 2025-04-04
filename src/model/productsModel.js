const db = require("./db");

const findAll = async () => {
	try {
		const [products] = await db.query("select * from products;");
		return products;
	} catch (err) {
		console.error(err);
	}
};

module.exports = { findAll };
