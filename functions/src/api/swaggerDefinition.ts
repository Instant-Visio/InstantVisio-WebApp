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
            User: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    subscription: {
                        type: 'object',
                        properties: {
                            isActive: 'boolean',
                            isQuotaReached: 'boolean',
                        },
                    },
                    usage: {
                        type: 'object',
                        properties: {
                            sentEmails: 'integer',
                            sentSMSs: 'integer',
                        },
                    },
                    updatedAt: {
                        type: 'integer',
                    },
                },
            },
            Room: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    createdAt: {
                        type: 'string',
                    },
                    updatedAt: {
                        type: 'string',
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
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
}
