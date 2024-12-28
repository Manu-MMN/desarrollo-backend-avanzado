import multer from "multer"
import path from "node:path" // si usamos path.join ya no nos preocupamos de dónde ha de ir la barra y los .. "/.." o "../"
// funcionará tanto en linux, mac o windows, lo que hace path es establecer un standar de rutas

//declaramos una configuración de dónde se van a almacenar los ficheros que nos llegan
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const rute = path.join(import.meta.dirname, "..", "public", "avatars")  //este import.meta.dirname nos da la carpeta actual en la que estamos
        callback(null, rute) //la 1º opción del callback suele ser si hay un error, por eso ponemos null
    },
    /* Cuando subes un archivo a la página, se crea algo como esto:

    {
  fieldname: 'avatar',
  originalname: '72576499_2335647189985614_1566607592006877184_n.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'C:\\Users\\EL MANU\\Documents\\05-BOOT\\08- Desarrollo Backend Avanzado con Node.js\\backend-nodejs-mongodb\\nodeapp\\public\\avatars',
  filename: '166b455509e60e8ede1b9bba9bbb2041',
  path: 'C:\\Users\\EL MANU\\Documents\\05-BOOT\\08- Desarrollo Backend Avanzado con Node.js\\backend-nodejs-mongodb\\nodeapp\\public\\avatars\\166b455509e60e8ede1b9bba9bbb2041',
  size: 96007
}
    De ahí, tomaremos lo que nos interesa para que los nombres tengan sentido PERO sin que se puedan repetir (con Date)
    
    */
    filename: function(req, file, callback) {
        const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`
        callback(null, filename) //"el plato está listo, sin errores, llévate el filename"
    }
})

//declaramos la configuración de upload
const upload = multer({
    storage
})

export default upload