const testRoutes = (app) => {
  app.route("/test").get((req, res) => res.send("Hello"));
};

module.exports = testRoutes;
