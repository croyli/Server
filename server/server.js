import express from 'express'
import path from 'path'
import cors from 'cors'
import axios from 'axios'
import sockjs from 'sockjs'
import cookieParser from 'cookie-parser'
// import { readFile } from 'fs'
// import { stat } from 'fs/promises'
import config from './config'
import Html from '../client/html'





require('colors')

let connections = []

const port = process.env.PORT || 2112
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))
// системный модуль fs
const { unlink } = require('fs').promises


// it skillcricial moment
server.use((req, res, next) => {
  res.set('x-skillcrucial-user', '75e66f9a-ace8-4669-9c6f-9062a988c7bc')
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
})
// it skillcricial moment


const URL = 'https://jsonplaceholder.typicode.com/users'


server.get('/api/v1/users', async (req, res) => {
  const { data } = await axios(URL)
  res.json({ data })
  res.end()
})

server.delete('/api/v1/users', (req, res) => {
  const delet = unlink(`${__dirname}/users.json`).then(() => console.log('File deleted')).catch(() => console.log('No file'))
  res.json( delet )
  res.end()
})


server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
