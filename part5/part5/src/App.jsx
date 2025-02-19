import { useState, useEffect, useRef } from "react"
import Note from "./components/Note"
import { Notification } from "./components/Notification"
import noteService from './services/notes'
import loginService from './services/login'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from "./components/NoteForm"
const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = useRef()
  
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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
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

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //   <div>
  //       <input 
  //         type="text"
  //         value={username}
  //         name="Username"
  //         placeholder="username"
  //         onChange={event => setUsername(event.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <input 
  //         type="text"
  //         value={password}
  //         name="Password"
  //         placeholder="password"
  //         onChange={event => setPassword(event.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <button >login</button>
  //     </div>
  //   </form>
  // )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : ''}
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>notes</h1>
      <Notification  message={errorMessage}/>
      {
        user === null ? loginForm() 
        : <div>
            <p>{user.name} logged</p>
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm
                createNote={addNote}
              />
            </Togglable>
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