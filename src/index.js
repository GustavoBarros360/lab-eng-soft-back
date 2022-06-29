const express = require("express");
const testRoutes = require("./routes/test");
const sellerRoutes = require("./routes/seller");

const app = express();
app.use(express.json());
const PORT = 4000;

testRoutes(app);
sellerRoutes(app);
app.listen(PORT, () => console.log("server is running on port 4000"));
