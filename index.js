const cors = require("cors");
const imagenesRouter = require("./imagenes.routes.js");
const morgan = require("morgan");
const { connectDB } = require("./database.js");
const buttonsRouter = require("./buttons.routes.js");
const userRouter = require("./user.routes.js");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors())
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
