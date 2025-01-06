require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const Note = require('./models/note')

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only on JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request,response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.statusMessage = `Note with id=${id} is not found`
        response.status(404).end()
    }
})
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id, typeof id);
    notes = notes.filter(note => {
        console.log(note, typeof note, note.id, typeof note.id, note.id !== id)
        return note.id !== id
    })
    response.status(204).end()
})

const generatedId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    
    return maxId + 1 
}
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generatedId()
    }

    notes = notes.concat(note)

    response.json(note)
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})