import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wanderlog API",
      version: "1.0.0",
      description: "API documentation for Wanderlog - A travel journal application",
      contact: {
        name: "Wanderlog Support",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT || 4008}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "surname", "username", "password"],
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User's first name",
            },
            surname: {
              type: "string",
              description: "User's last name",
            },
            username: {
              type: "string",
              description: "Unique username",
            },
            password: {
              type: "string",
              description: "User password (min 8 characters)",
              minLength: 8,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Trip: {
          type: "object",
          required: ["title", "description", "startDate", "endDate"],
          properties: {
            _id: {
              type: "string",
            },
            user: {
              type: "string",
              description: "User ID who owns the trip",
            },
            title: {
              type: "string",
              description: "Trip title",
            },
            description: {
              type: "string",
              description: "Trip description",
            },
            startDate: {
              type: "string",
              format: "date",
            },
            endDate: {
              type: "string",
              format: "date",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Destination: {
          type: "object",
          required: ["title", "location", "description", "dateVisited"],
          properties: {
            _id: {
              type: "string",
            },
            trip: {
              type: "string",
              description: "Trip ID",
            },
            title: {
              type: "string",
            },
            location: {
              type: "string",
            },
            description: {
              type: "string",
              maxLength: 500,
            },
            dateVisited: {
              type: "string",
              format: "date",
            },
          },
        },
        Journal: {
          type: "object",
          required: ["title", "content"],
          properties: {
            _id: {
              type: "string",
            },
            destination: {
              type: "string",
              description: "Destination ID",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
            },
            mood: {
              type: "string",
              enum: ["happy", "neutral", "sad", "excited", "relaxed"],
              default: "neutral",
            },
          },
        },
        Photo: {
          type: "object",
          required: ["url", "publicId"],
          properties: {
            _id: {
              type: "string",
            },
            destination: {
              type: "string",
              description: "Destination ID",
            },
            url: {
              type: "string",
              format: "uri",
            },
            caption: {
              type: "string",
            },
            publicId: {
              type: "string",
            },
          },
        },
        Comment: {
          type: "object",
          required: ["text", "targetType", "targetId"],
          properties: {
            _id: {
              type: "string",
            },
            text: {
              type: "string",
              minLength: 1,
              maxLength: 500,
            },
            user: {
              type: "string",
              description: "User ID",
            },
            targetType: {
              type: "string",
              enum: ["Journal", "Photo", "Destination"],
            },
            targetId: {
              type: "string",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            ok: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [join(__dirname, "../routes/*.js")],
};

export const swaggerSpec = swaggerJsdoc(options);
