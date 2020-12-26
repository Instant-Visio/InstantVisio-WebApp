import * as functions from 'firebase-functions'
import * as express from 'express'
import routerV1 from './v1'
import routerPrivate from './private'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerJSDoc from 'swagger-jsdoc'
import { swaggerDefinition } from './swaggerDefinition'
import { errorMiddleware } from './middlewares/errorMiddleware'
import * as cors from 'cors'

const app = express()

const options = {
    definition: swaggerDefinition,
    apis: ['./src/api/v1/**/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

app.use(cors({ origin: true }))

// API router v1 (/api/ is added on main index.ts export)
app.use('/api/v1', routerV1)
app.use('/api/v1-private', routerPrivate)
app.use('/api/v1-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(errorMiddleware)

export const api = functions.runWith({}).https.onRequest(app)
