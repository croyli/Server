import express from 'express'
import path from 'path'
import cors from 'cors'
import axios from 'axios'
import sockjs from 'sockjs'
import cookieParser from 'cookie-parser'
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
const { unlink, readFile, writeFile, stat } = require('fs').promises


// it skillcricial moment
server.use((req, res, next) => {
  res.set('x-skillcrucial-user', '75e66f9a-ace8-4669-9c6f-9062a988c7bc')
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
})
// it skillcricial moment


const URL = 'https://jsonplaceholder.typicode.com/users'

const GlobalPath = `${__dirname}/users.json`

async function GlobalUrl() {
  const result =  await axios.get(URL)
  return result.data
}

async function WriteFile() {
  const write = await writeFile(GlobalPath, JSON.stringify(await GlobalUrl()), 'utf8')
  return write
}

async function ReadFile () {
  const read = await readFile(GlobalPath, 'utf8')
    .then((text) => JSON.parse(text))
    .catch((err) => console.log(err))
  return read
}

async function Availibility() {
  const status = await stat(GlobalPath, 'utf8')
  return status
}

async function DeleteFile(){
  const deletefile = await unlink(GlobalPath)
  return deletefile
}




// get file
server.get('/api/v1/users', async (req, res) => {
  const Existans = await Availibility()
  .then(() => ReadFile())
  .catch(() => WriteFile())
  res.json(Existans)
})
// get file


// delete file
server.delete('/api/v1/users', async (req, res) => {
  const Existans_delete = await Availibility()
    .then(() => DeleteFile())
    .catch(() => 'No file')
  res.json(Existans_delete)
})
// delete file

// post file
server.post('/api/v1/users',async (req, res) => {
  const pos = await readFile(GlobalPath, 'utf8')
    .then(async (str) => {
      const parseString = JSON.parse(str)
      const lastId = parseString[parseString.length - 1].id + 1
      await writeFile(
        GlobalPath,
        JSON.stringify([...parseString, { ...req.body, id: lastId }]),
        'utf8'
      )
      return { status: 'success', id: lastId }
    })
    .catch(async(err) => {
      console.log(err)
      await writeFile(GlobalPath, JSON.stringify([{ ...req.body, id: 1 }]), 'utf8')
      return { status: 'succsed', id: 1 }
    })
  res.json(pos)
})
// post file

server.delete('/api/v1/users/:userId',async (req, res) => {
  const response = await readFile(GlobalPath, 'utf8')
  .then(async (str) => {
    const parsedString = JSON.parse(str)
    const filterString = parsedString.filter(it => {
      return +req.params.userId !== it.id
    })
    await writeFile(GlobalPath, JSON.stringify(filterString), 'utf8')
    return {status: 'success', id: +req.params.userId}
  })
  .catch(() => {
    return { status: 'No file', id: +req.params.userId }
  })
  res.json(response)
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
