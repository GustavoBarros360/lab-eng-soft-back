const db = require("../db");
const uuid = require("uuid");

async function insert(sql, values) {
  try {
    return await db.query(sql, values);
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
}

async function deleteSeller(sql, values) {
  try {
    return await db.query(sql, values);
  } catch (error) {
    console.log(error);
  }
}

async function update(sql, values) {
  try {
    const result = await db.query(sql, values);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const sellerRoutes = (app) => {
  app.route("/create-seller").post(async (req, res) => {
    const { name, salary, totalSalary, date, comission } = req.body;
    const id = uuid.v4();

    const sql = `INSERT INTO Vendedor (id_vendedor, nome_vendedor, data_admissao, salario_liquido, salario_bruto, percentual_comissao) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [id, name, date, salary, totalSalary, comission];
    const result = await insert(sql, values);

    res.send(result.rows);
  });

  app.route("/list-sellers").get(async (req, res) => {
    const sql = `SELECT * FROM Vendedor`;
    const result = await get(sql);

    res.send(result.rows);
  });

  app.route("/update-seller/:id").put(async (req, res) => {
    const { name, salary, totalSalary, date, comission } = req.body;
    const { id } = req.params;

    const sql = `UPDATE Vendedor SET nome_vendedor = $1, data_admissao = $2, salario_liquido = $3, salario_bruto = $4, percentual_comissao=$5 WHERE id_vendedor = $6`;
    const values = [name, date, salary, totalSalary, comission, id];
    const result = await update(sql, values);

    res.send(result.rows);
  });

  app.route("/delete-seller/:id").delete(async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Vendedor WHERE id_vendedor = $1`;
    const values = [id];
    const result = await deleteSeller(sql, values);

    res.send(result.rows);
  });
};

module.exports = sellerRoutes;
