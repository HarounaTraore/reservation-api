import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();
const port = 3000;
const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
