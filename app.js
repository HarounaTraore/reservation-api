import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import helmet from "helmet";
import i18next from "i18next";
import i18nextMiddleware from "i18next-express-middleware";
import translate from "./src/translations/index.js";
import router from "./src/routes/userRoutes.js";

const { fr, en, ar } = translate;
config();
const port = 3000;
const app = express();

i18next.init({
  lng: "fr",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
});

app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.json());
app.use(helmet());
app.use("/api", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
