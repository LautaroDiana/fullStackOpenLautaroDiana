import { useState, useEffect } from "react"
import {Note} from "./components/Note"
import { Notification } from "./components/Notification"
import noteService from './services/notes'
import loginService from './services/login'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki, 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    }
    // setNotes(notes.concat(noteObject))
    // setNewNote('')

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()


    try {
      
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")  

    } catch (error) {
      console.log(error.message)
      setErrorMessage("wrong credentials")
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }

  }

  const notesToShow = showAll 
  ? notes 
  : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        // alert(`the note ${note.content} was already deleted from server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
        <input 
          type="text"
          value={username}
          name="Username"
          placeholder="username"
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        <input 
          type="text"
          value={password}
          name="Password"
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button >login</button>
      </div>
    </form>
  )

  const notesForm = () => (
    <form onSubmit={addNote}>
      <input 
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>notes</h1>
      <Notification  message={errorMessage}/>
      {
        user === null ? loginForm() 
        : <div>
            <p>{user.name} logged</p>
            {notesForm()}
        </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(
          note => <Note key={note.id} note={note} toggleImportance={() => (toggleImportanceOf(note.id))}/>
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App