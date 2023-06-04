import express, {json} from 'express'
import categoriesRoutes from './routes/categories.routes.js'
import indexRoutes from './routes/index.routes.js'
import elementsRoutes from './routes/element.routes.js'

import {PORT} from './config.js'

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())

app.use(indexRoutes)
app.use('/api', categoriesRoutes)
app.use('/api', elementsRoutes)

app.listen(PORT)
console.log('server running on port', PORT)