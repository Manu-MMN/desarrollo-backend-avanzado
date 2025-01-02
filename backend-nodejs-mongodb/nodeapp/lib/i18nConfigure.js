import { I18n } from "i18n"
import path from "path"
import {__dirname} from "./utils.js"

const i18n = new I18n({
    locales: ["en", "es"],  //qué idiomas va a tener
    directory: path.join(__dirname, "..", "locales"),  //done van a ir?
    defaultLocale: "en", // qué idioma por defecto?
    autoReload: true, // busca cambios en los JSON locales (donde están los idiomas) y recargarlos si hubiese
    syncFiles: true, // sincroniza la información de local entre los diferentes ficheros
    cookie: 'nodeapp-locale',  //le metemos la cookie que hemos creado en el languageController
})

export default i18n
