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
  } catch (error) {
    console.log(error);
  }

  console.log("sucesso");
}

async function deleteProduct(sql) {
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

const productRoutes = (app) => {
  const Products = [];

  app.route("/create-product").post(async (req, res) => {
    const { name, price, category, quantity, categoryId } = req.body;
    const id = uuid.v4();

    Products.push(req.body);

    const sql = `INSERT INTO Produto (id_produto, nome_produto, valor, categoria, qtde_estoque, id_categoria) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [id, name, price, category, quantity, categoryId];
    await insert(sql, values);

    res.send(Products);
  });

  app.route("/list-Products").get(async (req, res) => {
    const sql = `SELECT * FROM Produto`;
    await get(sql);

    res.send(Products);
  });

  app.route("/update-Product/:id").put(async (req, res) => {
    const { name, price, category, quantity } = req.body;
    const { id } = req.params;

    Products.push(req.body);

    const sql = `UPDATE Produto SET (nome_produto ,valor, categoria, qtde_estoque) VALUES ($1, $2, $3, $4) WHERE id_Produto = ${id}`;
    const values = [name, price, category, quantity];
    await update(sql, values);

    res.send(Products);
  });

  app.route("/delete-Product/:id").delete(async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Produto WHERE id_Produto = ${id}`;
    await deleteProduct(sql);

    res.send(Products);
  });
};

module.exports = productRoutes;
