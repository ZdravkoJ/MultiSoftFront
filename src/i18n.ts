import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./localization/en.json";
import rs from "./localization/rs.json";
import rsC from "./localization/rsC.json";

const resources = {
  en: {
    translation: en,
  },
  rs: {
    translation: rs,
  },
  rsC: {
    translation: rsC,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "rs",
  fallbackLng: "rs",
  interpolation: {
    escapeValue: false,
  },
});
