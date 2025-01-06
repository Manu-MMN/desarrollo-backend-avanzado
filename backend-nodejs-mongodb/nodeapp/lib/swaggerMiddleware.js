import swaggerJSDoc from "swagger-jsdoc";      //genera una especificación desde código o TAML
import swaggerUi from "swagger-ui-express"    // Middleware de Express con Swagger UI

const options = {
    definition: {
        openapi: "3.0.3",   //como no pongas la versión del swagger.yaml te da error
        info: {
            tittle: "Nodeapp API",
            version: "0.1",
            description: "API de NodeApp"
        }
    },
    // apis: ["swagger.yaml"]
    apis: ["controllers/api/**/*.js"]
}


const specification = swaggerJSDoc(options)

export default [swaggerUi.serve, swaggerUi.setup(specification)]