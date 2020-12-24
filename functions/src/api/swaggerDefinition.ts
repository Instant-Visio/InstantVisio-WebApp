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
                        type: 'integer',
                    },
                    updatedAt: {
                        type: 'integer',
                    },
                    startAt: {
                        type: 'integer',
                    },
                    name: {
                        type: 'string',
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
            Members: {
                summary: 'Members',
                value:
                    '["aeffokp234cxLE2cm9kf9gdlnc2", "po9ALC30dzJZ1ocan13dkczk3"]',
            },
        },
        parameters: {
            room: {
                name: {
                    name: 'name',
                    description:
                        '(optional) The room name. If not supplied, the roomName will be the room id.',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'string',
                },
                startAt: {
                    name: 'startAt',
                    description:
                        '(optional) The UTC timestamp in seconds at which the meeting is scheduled to start. If not set, it will be the current time.',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'integer',
                },
                password: {
                    name: 'password',
                    description:
                        '(optional) The room password. If no password on room creation, a random one is generated.',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'string',
                },
                hideChatbot: {
                    name: 'hideChatbot',
                    description:
                        '(optional) Hide the chatbot button & features which will prevent users to get help and assistance from there. The chatbot is visible by default. The current chatbot provider is Crisp.chat.',
                    required: false,
                    type: 'boolean',
                    in: 'x-www-form-urlencoded',
                },
            },
            group: {
                members: {
                    name: 'members',
                    description:
                        'Group members user ids (initial or to add/remove)',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'string',
                    examples: {
                        example: {
                            $ref: '#/components/examples/Members',
                        },
                    },
                },
            },
        },
        responses: {
            400: {
                description:
                    'request content (x-www-form-urlencoded) not correct',
            },
            401: {
                description: 'missing authorization bearer token',
            },
            403: {
                description: 'authorization header present but not valid',
            },
            412: {
                description:
                    'authorization header present but not formatted correctly',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
}
