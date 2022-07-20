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

async function insertToVendaProduto(sql, values) {
  try {
    await db.query(sql, values);
    console.log("Sucesso venda produto");
  } catch (error) {
    console.log(error);
  }
}

async function get(sql) {
  try {
    return await db.query(sql);
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

const sellRoutes = (app) => {
  const Products = [];

  app.route("/create-sell").post(async (req, res) => {
    const { number, data, id_cliente, id_vendedor } = req.body;

    Products.push(req.body);
    const sql = `INSERT INTO Venda (numero_venda, data_venda, id_cliente, id_vendedor) VALUES ($1, $2, $3, $4)`;
    const values = [number, data, id_cliente, id_vendedor];
    await insert(sql, values);

    res.send(Products);
  });

  app.route("/add-product-to-sell").post(async (req, res) => {
    const { productId, quantity, number } = req.body;
    const id = uuid.v4();

    Products.push(req.body);
    const sql = `INSERT INTO venda_produto (id_venda_produto, numero_venda, id_produto, quantidade) VALUES ($1, $2, $3, $4)`;
    const values = [id, number, productId, quantity];
    await insertToVendaProduto(sql, values);

    res.send(Products);
  });

  app.route("/list-sell").get(async (req, res) => {
    const sql = `select numero_venda, nome_vendedor, nome_cliente from venda inner join vendedor on venda.id_vendedor = vendedor.id_vendedor inner join cliente on venda.id_cliente = cliente.id_cliente order by numero_venda asc`;
    const result = await get(sql);

    res.send(result.rows);
  });

  app.route("/update-sell/:id").put(async (req, res) => {
    const { data, idvendaprod, idcliente, id_vendedor } = req.body;
    const { id } = req.params;

    Products.push(req.body);

    const sql = `UPDATE Venda SET (data_venda, id_venda_produto, id_cliente, id_vendedor) VALUES ($1, $2, $3, $4) WHERE numero_venda = ${id}`;
    const values = [data, idvendaprod, idcliente, id_vendedor];
    await update(sql, values);

    res.send(Products);
  });

  app.route("/delete-Product/:id").delete(async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Venda WHERE id_venda = ${id}`;
    await deleteProduct(sql);

    res.send(Products);
  });
};

module.exports = sellRoutes;
