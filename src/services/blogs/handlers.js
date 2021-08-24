import db from "../../db/connection.js";

export const list = async (req, res, next) => {
	try {
		const result = await db.query("SELECT NOW()");
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};
