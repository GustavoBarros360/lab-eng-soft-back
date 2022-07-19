const db = require("../db");
const uuid = require("uuid");

async function insert(sql, values) {
  try {
    return await db.query(sql, values);
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

async function deleteClient(sql) {
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

const clientRoutes = (app) => {
  const clients = [];

  app.route("/create-client").post(async (req, res) => {
    const { name, data_reg, cpf, street, number, complement, cep, phone1 } =
      req.body;
    const id = uuid.v4();

    clients.push(req.body);

    const sql = `INSERT INTO Cliente (nome_cliente, data_registro, cpf, rua, numero, id_cliente, complemento, cep, telefone1) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
      name,
      data_reg,
      cpf,
      street,
      number,
      id,
      complement,
      cep,
      phone1,
    ];
    const result = await insert(sql, values);
    console.log(result);

    res.send(clients);
  });

  app.route("/list-clients").get(async (req, res) => {
    const sql = `SELECT * FROM Cliente`;
    await get(sql);

    res.send(clients);
  });

  app.route("/update-client/:id").put(async (req, res) => {
    const { name, data_reg, cpf, street, number, complement, cep, phone1 } =
      req.body;
    const { id } = req.params;

    clients.push(req.body);
    const sql = `UPDATE Cliente SET (nome_cliente, data_registro, cpf, rua, numero, complemento, cep, telefone1) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) WHERE id_cliente = ${id}`;
    const values = [
      name,
      data_reg,
      cpf,
      street,
      number,
      complement,
      cep,
      phone1,
    ];
    await update(sql, values);

    res.send(clients);
  });

  app.route("/delete-client/:id").delete(async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Cliente WHERE id_cliente = ${id}`;
    await deleteClient(sql);

    res.send(clients);
  });
};

module.exports = clientRoutes;
