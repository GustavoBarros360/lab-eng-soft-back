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
    return await db.query(sql);
  } catch (error) {
    console.log(error);
  }
}

async function getWithCategory(sql) {
  try {
    return await db.query(sql);
  } catch (error) {
    console.log(error);
  }
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
    const { name, price, quantity, categoryId } = req.body;
    const id = uuid.v4();

    Products.push(req.body);

    const sql = `INSERT INTO Produto (id_produto, nome_produto, valor, qtde_estoque, id_categoria) VALUES ($1, $2, $3, $4, $5)`;
    const values = [id, name, price, quantity, categoryId];
    await insert(sql, values);

    res.send(Products);
  });

  app.route("/list-products").get(async (req, res) => {
    const sql = `select * from produto`;
    const result = await get(sql);

    res.send(result.rows);
  });

  app.route("/list-products-category").get(async (req, res) => {
    const sql = `select nome_produto, nome_categoria, valor, qtde_estoque
    from produto inner join categoria on produto.id_categoria = categoria.id_categoria;`;
    const result = await get(sql);

    res.send(result.rows);
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
