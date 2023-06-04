import express, {json} from 'express'
import categoriesRoutes from './routes/categories.routes.js'
import indexRoutes from './routes/index.routes.js'
import elementsRoutes from './routes/element.routes.js'

import {PORT} from './config.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', categoriesRoutes)
app.use('/api', elementsRoutes)

app.listen(PORT)
console.log('server running on port', PORT)