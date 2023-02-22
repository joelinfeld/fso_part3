const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

moongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        crossOriginIsolated.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

const password = process.argv[2]
const url = `mongodb+srv://joelinfeld:${password}@cluster0.scrb7xq.mongodb.net/?retryWrites=true&w=majority`





const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons=> {
            console.log('phonebook:')
            persons.map(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}

else {
    const person = new Person ({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}