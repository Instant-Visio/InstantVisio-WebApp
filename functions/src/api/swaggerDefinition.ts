export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'InstantVisio API',
        description:
            'Provide an open source API to create, join, manage video rooms, and more',
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            Room: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    createdAt: {
                        type: 'integer',
                    },
                    updatedAt: {
                        type: 'integer',
                    },
                    startAt: {
                        type: 'integer',
                    },
                },
            },
            Destination: {
                properties: {
                    email: {
                        type: 'string',
                    },
                    phone: {
                        type: 'string',
                    },
                    lang: {
                        type: 'string',
                    },
                    country: {
                        type: 'string',
                    },
                },
            },
            Reminder: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    hostName: {
                        type: 'integer',
                    },
                    sendAt: {
                        type: 'integer',
                    },
                    createdAt: {
                        type: 'integer',
                    },
                    updatedAt: {
                        type: 'integer',
                    },
                    isSent: {
                        type: 'boolean',
                    },
                    destinations: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Destination',
                        },
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                description: 'Enter JWT Bearer token **_only_**',
                bearerFormat: 'JWT',
            },
        },
        examples: {
            Destinations: {
                summary: 'Mixed email, sms and languages',
                value:
                    '[{"email": "user@example.com", "lang": "en"}, {"phone": "+33600000000", "lang":"fr"}, {"phone": "+33600000000", lang:"fr", country:"en"}]',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
}
