const express = require("express");
const nunjucks = require("nunjucks");
const router = require("./routes")
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(PORT, () => {
  console.log("server start");
});
