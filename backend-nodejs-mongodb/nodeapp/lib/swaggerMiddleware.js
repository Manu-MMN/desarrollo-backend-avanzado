import swaggerJSDoc from "swagger-jsdoc";      // Genera una especificación desde código o YAML
import swaggerUi from "swagger-ui-express";    // Middleware de Express con Swagger UI

const options = {
    definition: {
        openapi: "3.0.3",   // Como no pongas la versión del swagger.yaml te da error
        info: {
            title: "Nodeapp API",
            version: "0.1",
            description: "API de NodeApp"
        },
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
                bearerFormat: "JWT",
                description: 'JWT Authorization header. Example: "Authorization: {token}"'
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["controllers/api/**/*.js"] // Aquí se define dónde buscar las anotaciones
};

const specification = swaggerJSDoc(options);

export default [swaggerUi.serve, swaggerUi.setup(specification)];
