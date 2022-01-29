const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

morgan.token('content', (req, res) => {
    return JSON.stringify(req.body)
})

let persons = [
    {
    "name": "ding dosby",
    "number": "777",
    "id": 10
    },
    {
    "name": "bam margera",
    "number": "11111",
    "id": 11
    },
    {
    "name": "bing badly",
    "number": "12415566136",
    "id": 12
    },
    {
    "name": "dddd",
    "number": "1215",
    "id": 13
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) response.json(person)
    else response.status(404).end()
})  

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${notes.length} people<br/>${date}`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    if (Object.keys(request.body).length === 0) response.status(400).json({error: 'no entry given'})
    if (!request.body.name) return response.status(400).json({error: 'no name entered'})
    if (!request.body.number) return response.status(400).json({error: 'no number entered'})
    if (persons.find(person => person.name === request.body.name || person.number === request.body.number)) {
        return response.status(400).json({error: 'name or number already exists'})
    }
    const person = {
        'name': request.body.name,
        'number': request.body.number,
        'id': Math.round(Math.random() * 100000) 
    }
    persons.concat(person)
    console.log(person)
    response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
