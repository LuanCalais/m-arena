import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Meme Arena API",
      version: "1.0.0",
      description: "API para criação e votação de memes",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        Meme: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              example: "Quando o café acaba na sexta",
            },
            top_text: {
              type: "string",
              example: "Fazer hora extra",
            },
            bottom_text: {
              type: "string",
              example: "Sair correndo às 18h",
            },

            template: {
              type: "string",
              enum: ["drake", "doge", "distracted", "buttons", "cat", "brain"],
              example: "drake",
            },
            author: {
              type: "string",
              example: "dev_cansado",
            },
            votes: {
              type: "integer",
              example: 42,
            },
            created_at: {
              type: "integer",
              description: "Unix timestamp",
              example: 1711900800,
            },
          },
        },
      },
    },
  },
  apis: ["./src/app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
