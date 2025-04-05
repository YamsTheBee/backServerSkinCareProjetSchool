const { findOne, addOne } = require("../model/productsModel");

const getOne = async (req, res) => {
	const userId = parseInt(req.params.id, 1);
	console.log(userId);
	try {
		if (isNaN(userId)) {
			throw new Error();
		}
		const [user] = await findOne(userId);
		res.status(200).json(user);
	} catch (error) {
		res.sendSataus(500);
	}
};

const createOne = async (req, res) => {
	const newUser = req.body;
	console.log("je suis sur la route createOne", newUser);

	const errors = ValidateUser(newUser);
	if (errors) {
		return res.status(401).send(errors);
	}

	//has le mdp
	// biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: <explanation>
	const hashedPassword = await hashedPassword(newUser.pass);
	//console.log({"newUser, pass: hashedPassWord})
	const result = await addOne({ ...newUser, pass: hashedPassword });
	res.status(201).send(result);
};
module.exports = { getOne, createOne };
