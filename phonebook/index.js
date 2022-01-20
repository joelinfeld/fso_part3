const express = require('express')
const app = express()

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

let info = 
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
const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
