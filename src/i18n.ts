import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
    .use(HttpBackend) // 👈 add backend
    .use(initReactI18next)
    .init({
        returnNull: false,        // prevents showing "null" when translation is missing
        returnEmptyString: false, // prevents showing "" if translation is empty
        saveMissing: false,
        parseMissingKeyHandler: () => "", // don't show "forms.errors"
        lng: "en",
        fallbackLng: "en",
        ns: ["common"],        // namespaces you expect
        defaultNS: "common",
        interpolation: { escapeValue: false },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json" // where translations live
        }
    });

export default i18n;
