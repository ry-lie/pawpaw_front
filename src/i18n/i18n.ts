import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ko",
    supportedLngs: ["ko", "en"],
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ko: {
        structureFooter: require("../../public/locales/ko/structureFooter.json"),
        auth: require("../../public/locales/ko/auth.json"),
        main: require("../../public/locales/ko/main.json"),
      },
      en: {
        structureFooter: require("../../public/locales/en/structureFooter.json"),
        auth: require("../../public/locales/en/auth.json"),
        main: require("../../public/locales/en/main.json"),
      },
    },
  });

  export default i18n;
