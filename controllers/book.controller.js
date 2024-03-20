const postgre = require("../database");
const bookController = {
  getAll: async (req, res) => {
    try {
      const { rows } = await postgre.query("select * from books");
      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  getById: async (req, res) => {
    try {
      const { rows } = await postgre.query(
        "select * from books where id = $1",
        [req.params.id]
      );

      if (rows[0]) {
        return res.json({ msg: "OK", data: rows });
      }

      res.status(404).json({ msg: "not found" });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  create: async (req, res) => {
    try {
      const { title, author } = req.body;

      const sql = "INSERT INTO books(title, author) VALUES($1, $2) RETURNING *";

      const { rows } = await postgre.query(sql, [title, author]);

      res.json({ msg: "OK", data: rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  updateById: async (req, res) => {
    try {
      const { title, author } = req.body;

      const sql =
        "UPDATE books set title = $1, author = $2 where id = $3 RETURNING *";

      const { rows } = await postgre.query(sql, [title, author, req.params.id]);

      res.json({ msg: "OK", data: rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  deleteById: async (req, res) => {
    try {
      const sql = "DELETE FROM books where book_id = $1 RETURNING *";

      const { rows } = await postgre.query(sql, [req.params.id]);

      if (rows[0]) {
        return res.json({ msg: "OK", data: rows[0] });
      }

      return res.status(404).json({ msg: "not found" });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  showSomething: async (req, res) => {
    try {
      const result = await postgre.query("SELECT NOW()");
      console.log("Query Result:", result.rows[0]);
      return res.json(result.rows[0]);
    } catch (error) {
      console.error("Error executing SQL query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = bookController;
