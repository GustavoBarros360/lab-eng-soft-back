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

  console.log("sucesso");
}

async function deleteSeller(sql, values) {
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

const sellerRoutes = (app) => {
  const sellers = [];

  app.route("/create-seller").post(async (req, res) => {
    const { name, salary, totalSalary, date, comission } = req.body;
    const id = uuid.v4();

    sellers.push(req.body);

    const sql = `INSERT INTO Vendedor (id_vendedor, nome_vendedor, data_admissao, salario_liquido, salario_bruto, percentual_comissao) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [id, name, date, salary, totalSalary, comission];
    await insert(sql, values);

    res.send(sellers);
  });

  app.route("/list-sellers").get(async (req, res) => {
    const sql = `SELECT * FROM Vendedor`;
    const result = await get(sql);

    res.send(result.rows);
  });

  app.route("/update-seller/:id").put(async (req, res) => {
    const { name, salary, totalSalary, date, comission } = req.body;
    const { id } = req.params;

    sellers.push(req.body);

    const sql = `UPDATE Vendedor SET nome_vendedor = $1, data_admissao = $2, salario_liquido = $3, salario_bruto = $4, percentual_comissao=$5 WHERE id_vendedor = $6`;
    const values = [name, date, salary, totalSalary, comission, id];
    await update(sql, values);

    res.send(sellers);
  });

  app.route("/delete-seller/:id").delete(async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Vendedor WHERE id_vendedor = $1`;
    const values =[id]
    await deleteSeller(sql,values);

    res.send(sellers);
  });
};

module.exports = sellerRoutes;
