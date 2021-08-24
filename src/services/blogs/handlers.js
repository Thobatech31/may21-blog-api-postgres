import db from "../../db/connection.js";

export const list = async (req, res, next) => {
	try {
		const blogs = await db.query(`SELECT 
		blog.blog_id,
		blog.author_id ,
		blog.title,
		blog.content,
		blog.created_at,
		author.author_id,
		author.name,
		author.last_name,
		author.avatar
		FROM blogs AS blog
		INNER JOIN authors AS author ON blog.author_id=author.author_id ORDER BY blog.created_at DESC;`);
		res.send(blogs.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const create = async (req, res, next) => {
	try {
		const {
			title,
			category,
			content,
			read_time_unit,
			read_time_value,
			author_id,
		} = req.body;
		const blog = await db.query(
			`INSERT INTO blogs(title, category, content, read_time_unit, read_time_value, author_id ) VALUES('${title}','${category}','${content}','${read_time_unit}','${read_time_value}','${author_id}') RETURNING *;`
		);
		res.send(blog.rows[0]);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const single = async (req, res, next) => {
	try {
		const { blog_id } = req.params;
		const blogs = await db.query(
			`SELECT 
			blog.blog_id,
			blog.author_id ,
			blog.title,
			blog.content,
			blog.created_at,
			author.author_id,
			author.name,
			author.last_name,
			author.avatar
			FROM blogs AS blog
			INNER JOIN authors AS author ON blog.author_id=author.author_id 
			WHERE blog.blog_id = '${blog_id}'
			ORDER BY blog.created_at DESC;`
		);
		const [found, ...rest] = blogs.rows;

		res.status(found ? 200 : 404).send(found);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const update = async (req, res, next) => {
	try {
		const { blog_id } = req.params;

		const {
			title,
			category,
			content,
			read_time_unit,
			read_time_value,
			author_id,
		} = req.body;

		const blogs = await db.query(
			`UPDATE blogs
			 SET
			 title='${title}',
			 category='${category}',
			 content='${content}',
			 read_time_unit='${read_time_unit}',
			 read_time_value='${read_time_value}',
			 author_id='${author_id}',
			 updated_at = NOW()
			 WHERE blog_id=${blog_id} RETURNING *;`
		);

		const [found, ...rest] = blogs.rows;

		res.status(found ? 200 : 400).send(found);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const deleteAuthor = async (req, res, next) => {
	try {
		const { blog_id } = req.params;

		const dbResult = await db.query(
			`DELETE FROM blogs
			 WHERE blog_id=${blog_id};`
		);
		res.status(dbResult.rowCount ? 200 : 400).send();
	} catch (error) {
		res.status(500).send(error);
	}
};
