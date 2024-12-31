// Para Common JS, a la hora de referenciar la carpeta actual, se hace con "__dirname"
//--recordemos que al no usar Common JS, hemos referenciado la carpeta actual con import.meta.dirname--

//en ECMA SCRIPT MODULE usamos
//import.meta.dirname 

// si hacemos un: 
export const __dirname = import.meta.dirname 
//y lo importamos en uploadConfigure, podriamos usar dirname en lugar de import.meta.dirname

//import.meta.dirname existe desde node 20.11

//En ESM en Node inferior a 20.11:
/*
import {dirname} from "node:path"
import { fileURLToPath } from "node:url"
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

import.meta.dirname existe desde node 20.11 */
