import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import helmet from "helmet";
config();
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(helmet());

import {
  createUser,
  deleteUser,
  getAllUser,
  getByIdUser,
  updateUser,
} from "./src/services/User.js";

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
