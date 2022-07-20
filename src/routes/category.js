const db = require("../db");
const uuid = require("uuid");

async function insert(sql, values) {
  try {
    await db.query(sql, values);
  } catch (error) {
    console.log(error);
  }

  console.log("Sucesso");
}

async function get(sql) {
  try {
    const result = await db.query(sql);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.log(error);
  }

  console.log("sucesso");
}

async function deleteCategory(sql) {
  try {
    await db.query(sql);
    console.log(result.rows);
  } catch (error) {
    console.log(error);
  }

  console.log("deletado");
}

async function update(sql, values) {
  try {
    const result = await db.query(sql, values);
    console.log(result.rows);
  } catch (error) {
    console.log(error);
  }

  console.log("atualizado");
}

const categoryRoutes = (app) => {
  const categorys = [];

  app.route("/create-category").post(async (req, res) => {
    const { name } = req.body;
    const id = uuid.v4();

    categorys.push(req.body);

    const sql = `INSERT INTO Categoria (id_categoria, nome_categoria) VALUES ($1, $2)`;
    const values = [id, name];
    await insert(sql, values);

    res.send(categorys);
  });

  app.route("/list-categories").get(async (req, res) => {
    const sql = `SELECT * FROM Categoria`;
    const result = await get(sql);

    res.send(result);
  });

  app.route("/update-category/:id").put(async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    categorys.push(req.body);

    const sql = `UPDATE Categoria SET (nome_categoria) VALUES ($1) WHERE id_categoria = ${id}`;
    const values = [name];
    await update(sql, values);

    res.send(categorys);
  });

  app.route("/delete-category/:id").delete(async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Categoria WHERE id_categoria = ${id}`;
    await deleteCategory(sql);

    res.send(categorys);
  });
};

module.exports = categoryRoutes;
