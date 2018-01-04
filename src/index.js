import express from "express";
import process from "process";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "config";

console.log(config.get("db.dbName"));
mongoose.connect(
  `mongodb://${config.get("db.host")}/${config.get("db.dbName")}`,
  { useMongoClient: true }
);

const db = mongoose.connection;
db
  .on("error", () => {
    console.error("Cant connect to database");
  })
  .once("open", () => {
    console.log("Connected to database");
  });

const app = express();
app.use(morgan("combined"));

app.get("/", function(req, res) {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
