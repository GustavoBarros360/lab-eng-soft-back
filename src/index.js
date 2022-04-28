const express = require("express");
const testRoutes = require("./routes/test");

const app = express();
const PORT = 4000;

testRoutes(app);
app.listen(PORT, () => console.log("server is running on port 4000"));
