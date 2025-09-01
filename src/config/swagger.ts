export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "CarambarNext API",
    version: "1.0.0",
    description: "API pour les blagues Carambar - Documentation interactive",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Serveur de développement",
    },
    {
      url: "Mon url de production",
      description: "Serveur de production",
    },
  ],
  tags: [
    {
      name: "Blagues",
      description: "Gestion des blagues Carambar",
    },
  ],
  paths: {
    "/api/blagues": {
      get: {
        summary: "Récupère toutes les blagues",
        description:
          "Retourne la liste de toutes les blagues triées par ID décroissant",
        tags: ["Blagues"],
        responses: {
          "200": {
            description: "Liste des blagues récupérée avec succès",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Joke",
                  },
                },
                example: [
                  {
                    id: 1,
                    question:
                      "Que dit un escargot quand il croise une limace ?",
                    reponse: "Regarde le nudiste !",
                  },
                  {
                    id: 2,
                    question:
                      "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
                    reponse: "Parce que sinon, ils tombent dans le bateau !",
                  },
                ],
              },
            },
          },
          "500": {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Ajoute une nouvelle blague",
        description:
          "Crée une nouvelle blague avec une question et une réponse",
        tags: ["Blagues"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NewJoke",
              },
              example: {
                question: "Que dit un escargot quand il croise une limace ?",
                reponse: "Regarde le nudiste !",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Blague ajoutée avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Success",
                },
                example: {
                  message: "Blague ajoutée avec succès !",
                  insertedId: 42,
                },
              },
            },
          },
          "400": {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error:
                    "Données invalides. Vérifiez votre question et réponse.",
                },
              },
            },
          },
          "500": {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/blagues/random": {
      get: {
        summary: "Récupère une blague aléatoire",
        description:
          "Retourne une blague choisie au hasard dans la base de données",
        tags: ["Blagues"],
        responses: {
          "200": {
            description: "Blague aléatoire récupérée avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Joke",
                },
                example: {
                  id: 42,
                  question: "Que dit un escargot quand il croise une limace ?",
                  reponse: "Regarde le nudiste !",
                },
              },
            },
          },
          "404": {
            description: "Aucune blague trouvée",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Aucune blague trouvée dans la base de données.",
                },
              },
            },
          },
          "500": {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/blagues/{id}": {
      get: {
        summary: "Récupère une blague par son ID",
        description: "Retourne une blague spécifique en fonction de son ID",
        tags: ["Blagues"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la blague à récupérer",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Blague récupérée avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Joke",
                },
              },
            },
          },
          "404": {
            description: "Blague non trouvée",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Joke: {
        type: "object",
        required: ["id", "question", "reponse"],
        properties: {
          id: {
            type: "integer",
            description: "ID unique de la blague",
            example: 1,
          },
          question: {
            type: "string",
            description: "La question/devinette de la blague",
            maxLength: 100,
            example: "Que dit un escargot quand il croise une limace ?",
          },
          reponse: {
            type: "string",
            description: "La réponse à la blague",
            example: "Regarde le nudiste !",
          },
        },
      },
      NewJoke: {
        type: "object",
        required: ["question", "reponse"],
        properties: {
          question: {
            type: "string",
            description: "La question/devinette de la blague",
            maxLength: 100,
            example: "Que dit un escargot quand il croise une limace ?",
          },
          reponse: {
            type: "string",
            description: "La réponse à la blague",
            example: "Regarde le nudiste !",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Message d'erreur",
            example: "Une erreur est survenue.",
          },
        },
      },
      Success: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Message de succès",
            example: "Opération réussie !",
          },
          insertedId: {
            type: "integer",
            description: "ID de la blague ajoutée",
            example: 42,
          },
        },
      },
    },
  },
};
