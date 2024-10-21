import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import helmet from "helmet";
import i18nextMiddleware from "i18next-express-middleware";
import translate from "./src/translations/index.js";
import routes from "./src/routes/index.js";
import authRoute from "./src/routes/authRoute.js";
import authenticateJWT from "./src/middlewares/authenticateJWT.js";
config();
const port = 3000;
const app = express();

app.use(i18nextMiddleware.handle(translate));

app.use(bodyParser.json());
app.use(helmet());
app.use("/api", authRoute);
app.use("/api", authenticateJWT, routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
