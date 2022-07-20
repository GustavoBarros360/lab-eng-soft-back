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

async function deleteProduct(sql, values) {
  try {
    await db.query(sql, values);
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

const ProductRoutes = (app) => {
  const Products = [];

  app.route("/create-Product").post(async (req, res) => {
    const { data, idvendaprod, idcliente, id_vendedor } = req.body;
    const id = uuid.v4();

    Products.push(req.body);
    ome;
    const sql = `INSERT INTO Venda (numero_venda, data_venda, id_venda_produto, id_cliente, id_vendedor) VALUES ($1, $2, $3, $4, $5)`;
    const values = [id, data, idvendaprod, idcliente, id_vendedor];
    await insert(sql, values);

    res.send(Products);
  });

  app.route("/list-Products").get(async (req, res) => {
    const sql = `SELECT * FROM Venda`;
    await get(sql);

    res.send(Products);
  });

  app.route("/update-Product/:id").put(async (req, res) => {
    const { data, idvendaprod, idcliente, id_vendedor } = req.body;
    const { id } = req.params;

    Products.push(req.body);

    const sql = `UPDATE Venda SET data_venda =$1, id_venda_produto=$2, id_cliente=$3, id_vendedor=$4 WHERE numero_venda = $5`;
    const values = [data, idvendaprod, idcliente, id_vendedor, id];
    await update(sql, values);

    res.send(Products);
  });

  app.route("/delete-Product/:id").delete(async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Venda WHERE id_venda = $1`;
    const values =[id]
    await deleteProduct(sql, values);

    res.send(Products);
  });
};

module.exports = ProductRoutes;
