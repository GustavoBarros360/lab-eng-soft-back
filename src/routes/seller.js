const sellerRoutes = (app) => {
  const sellers = [];

  app.route("/create-seller").post((req, res) => {
    const { name, age } = req.body;

    sellers.push(req.body);

    res.send(sellers);
  });

  app.route("/list-sellers").get((req, res) => {
    res.send(sellers);
  });
};

module.exports = sellerRoutes;
