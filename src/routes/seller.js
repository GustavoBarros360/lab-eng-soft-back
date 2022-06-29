const sellerRoutes = (app) => {
  const sellers = [];

  app.route("/create-seller").post((req, res) => {
    const { name, age } = req.body;

    // console.log(name, age);
    sellers.push(req.body);
    console.log(sellers);

    res.send();
  });

  app.route("/list-sellers").get((req, res) => {
    res.send(sellers);
  });
};

module.exports = sellerRoutes;
