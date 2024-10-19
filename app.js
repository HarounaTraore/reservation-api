import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import helmet from "helmet";
import i18nextMiddleware from "i18next-express-middleware";
import translate from "./src/translations/index.js"; 
import router from "./src/routes/userRoutes.js";

config();
const port = 3000;
const app = express();

app.use(i18nextMiddleware.handle(translate));

app.use(bodyParser.json());
app.use(helmet());
app.use("/api", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
