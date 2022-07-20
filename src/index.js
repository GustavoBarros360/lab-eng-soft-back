const express = require("express");
const testRoutes = require("./routes/test");
const sellerRoutes = require("./routes/seller");
const clientRoutes = require("./routes/client");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const sellRoutes = require("./routes/sell");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

app.route("/").get((req, res) => res.send("Hello"));

testRoutes(app);
sellerRoutes(app);
clientRoutes(app);
productRoutes(app);
categoryRoutes(app);
sellRoutes(app);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
