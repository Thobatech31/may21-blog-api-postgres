import db from "../../db/connection.js";

export const list = async (req, res, next) => {
	try {
		const authors = await db.query(`SELECT * FROM authors`);
		res.send(authors.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const create = async (req, res, next) => {
	try {
		const { name, last_name, avatar } = req.body;
		const author = await db.query(
			`INSERT INTO authors(name,last_name,avatar) VALUES('${name}','${last_name}','${avatar}') RETURNING *;`
		);
		res.send(author.rows[0]);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const single = async (req, res, next) => {
	try {
		const { author_id } = req.params;
		const authors = await db.query(
			`SELECT * FROM authors WHERE author_id=${author_id};`
		);
		const [found, ...rest] = authors.rows;

		res.status(found ? 200 : 404).send(found);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const update = async (req, res, next) => {
	try {
		const { author_id } = req.params;
		const { name, last_name, avatar } = req.body;
		const authors = await db.query(
			`UPDATE authors
			 SET name ='${name}',
			 last_name = '${last_name}',
			 avatar = '${avatar}',
			 updated_at = NOW()
			 WHERE author_id=${author_id} RETURNING *;`
		);
		const [found, ...rest] = authors.rows;
		res.status(found ? 200 : 400).send(found);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const deleteAuthor = async (req, res, next) => {
	try {
		const { author_id } = req.params;
		const { name, last_name, avatar } = req.body;
		const dbResult = await db.query(
			`DELETE FROM authors
			 WHERE author_id=${author_id};`
		);
		res.status(dbResult.rowCount ? 200 : 400).send();
	} catch (error) {
		res.status(500).send(error);
	}
};
