const Note = ({id, content}) => <li key={id}>{content}</li>

const App = ({ notes }) => {
  return (
    <div>
      <h1>notes</h1>
      <ul>
        {notes.map(
          note => <Note key={note.id} content={note.content} />
        )}
      </ul>
    </div>
  )
}

export default App