const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/people', (request, response) => {
  response.json(people)
})

app.get('/api/info', (request, response) => {
  const date = new Date()
  response.send(`Phonebook has info for ${people.length} people\n ${date}`)
})

app.get('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(person => person.id === id)
  if (person) response.json(person)
  else  response.status(404).end()
})

app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(person => person.id !== id)
  const person = people.find(person => person.id === id)
  response.status(204).end()
})

app.post('/api/people', (request, response) => {
  const person = request.body
  if (people.some(p => p.name === person.name)) {
    return response.status(400).json({
      error: `${person.name} already exists in phonebook`
    })
  }
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: `name or number missing`
    })
  }
  person.id = Math.floor(Math.random() * 10000)
  people = people.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})