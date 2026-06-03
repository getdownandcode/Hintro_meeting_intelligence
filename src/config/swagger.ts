import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hintro Meeting Intelligence API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      "/health": {
        get: {
          summary: "Health check",
          responses: { "200": { description: "Service is up" } },
        },
      },
      "/api/auth/register": {
        post: {
          summary: "Register",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: { email: "user@example.com", password: "password123" },
              },
            },
          },
          responses: { "201": { description: "Account created" } },
        },
      },
      "/api/auth/login": {
        post: {
          summary: "Login",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: { email: "user@example.com", password: "password123" },
              },
            },
          },
          responses: { "200": { description: "JWT token returned" } },
        },
      },
      "/api/meetings": {
        get: {
          summary: "List meetings",
          security: [{ bearerAuth: [] }],
          responses: { "200": { description: "Meetings returned" } },
        },
        post: {
          summary: "Create meeting",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  title: "Sprint Planning",
                  meetingDate: "2026-06-03T10:00:00.000Z",
                  participants: ["Alice", "John"],
                  transcript: [
                    { timestamp: "00:10", speaker: "John", text: "We should launch Friday." },
                    { timestamp: "00:20", speaker: "Alice", text: "I will prepare release notes." },
                  ],
                },
              },
            },
          },
          responses: { "201": { description: "Meeting created" } },
        },
      },
      "/api/meetings/{id}": {
        get: {
          summary: "Get meeting",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "Meeting returned" } },
        },
      },
      "/api/meetings/{id}/analyze": {
        post: {
          summary: "Analyze meeting with Gemini",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "Grounded analysis returned" } },
        },
      },
      "/api/action-items": {
        get: {
          summary: "List action items",
          security: [{ bearerAuth: [] }],
          responses: { "200": { description: "Action items returned" } },
        },
      },
      "/api/action-items/overdue": {
        get: {
          summary: "Get overdue action items",
          security: [{ bearerAuth: [] }],
          responses: { "200": { description: "Overdue action items returned" } },
        },
      },
      "/api/action-items/{id}/status": {
        patch: {
          summary: "Update action item status",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: { status: "COMPLETED" },
              },
            },
          },
          responses: { "200": { description: "Status updated" } },
        },
      },
      "/api/evaluation": {
        get: {
          summary: "Evaluation metadata",
          responses: { "200": { description: "Evaluation metadata returned" } },
        },
      },
    },
  },
  apis: [],
});
