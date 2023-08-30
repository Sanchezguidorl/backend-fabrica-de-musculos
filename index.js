const cors = require("cors");
const imagenesRouter = require("./imagenes.routes.js");
const morgan = require("morgan");
const { connectDB } = require("./database.js");
const buttonsRouter = require("./buttons.routes.js");
const userRouter = require("./user.routes.js");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(imagenesRouter);
app.use(buttonsRouter);
const main = async () => {
  await connectDB();
};
main();
app.listen(PORT, () => {
  console.log("server online");
});
