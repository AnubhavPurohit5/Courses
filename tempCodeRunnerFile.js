const express = require("express");
const app = express();
const adminrouter = require("./routes/admin");
// const userrouter = require("./routes/user");
app.use(express.json());
app.use("/admin", adminrouter);
// app.use("/user", userrouter);
app.listen(3000);
