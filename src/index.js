const express = require("express");
const testRoutes = require("./routes/test");
const sellerRoutes = require("./routes/seller");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.route("/").get((req, res) => res.send("Hello"));

testRoutes(app);
sellerRoutes(app);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
