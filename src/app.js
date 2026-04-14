import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import routes from './routes/pessoaRouter.js'

const teste = await db.get('SELECT 1')
console.log(teste)

const app = express()
app.use(express.json())
app.use(cors())

app.use(routes)

export default app
