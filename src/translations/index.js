import dotenv from "dotenv";
import i18next from "i18next";
import fr from "./fr.json" assert { type: "json" };
import en from "./en.json" assert { type: "json" };
import ar from "./ar.json" assert { type: "json" };
dotenv.config();

i18next.init({
  lng: process.env.language,
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
});

export default i18next;
