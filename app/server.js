const products = require("./data/products.json");
const statement = require("./data/statement.json");
const voucher = require("./data/voucher.json");

const express = require("express"); //llamamos a Express
const router = express.Router();
const app = express();
const cors = require("cors");

const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 8080; // establecemos nuestro puerto

const dirPath = path.join(__dirname, "public");

const files = fs.readdirSync(dirPath).map((name) => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/public/${name}`,
  };
});

app.set("view engine", "ejs");
app.use(express.static("app/public"));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin, access-control-allow-headers"
  );
  next();
});

router.get("/", function (req, res) {
  res.json({ mensaje: __dirname });
});

// router.get("/file/pdf", function (req, res) {
router.get("/file/pdf/:id", function (req, res) {
  // res.status(500).send(new Error('Errooooooor!!!!'));
  // setTimeout(() => {
  res.sendFile(__dirname + "/public/extracto.pdf");
  // }, 1500);
});

router.get("/file/xlsx/:id", function (req, res) {
  // setTimeout(() => {

  res.sendFile(__dirname + "/public/extracto.xlsx");
  // }, 0);
});

router.get("/products", function (req, res) {
  // setTimeout(() => {
  res.json(products);
  // }, 0);
});

router.post("/statement", (req, res) => {
  console.log(req.body);
  // statement.data.fileURL = "http://localhost:8080/api/file/" + req.body.format;
  // statement.data.fileURL = "http://localhost:8080/api/file/" + req.body.productId;
  statement.data.fileURL = `http://localhost:8080/api/file/${req.body.format}/${req.body.productId}`;
  statement.data.productId = req.body.productId;
  statement.data.fileName = `extracto_${req.body.productId}`;
  // statement.status.code = 404;
  // setTimeout(() => {
  res.json(statement);
  // }, 0);
  // res.status(500).send(new Error('Errooooooor!!!!'));
});

router.post("/share-statement", function (req, res) {
  // voucher.status.code = 401;
  voucher.data.voucher = req.body.voucher;
  voucher.data.receiveres = req.body.receiveres;
  setTimeout(() => {
    res.json(voucher);
    // res.status(500).send(new Error('Errooooooor!!!!'));
  }, 2000);
});

router.post("/", function (req, res) {
  res.json({ mensaje: "Método post" });
});

router.delete("/", function (req, res) {
  res.json({ mensaje: "Método delete" });
});

app.use("/api", router);
app.use(
  cors({
    origin: "*",
  })
);

// iniciamos nuestro servidor
app.listen(port);
console.log("API escuchando en el puerto " + port);
