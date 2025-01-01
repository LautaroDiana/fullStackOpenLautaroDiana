import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({handleNameFilterChange}) => {
  return (
    <div>
      <h2>Add a filter</h2>
      <input onChange={handleNameFilterChange} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({filteredPersons, deleteUser}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        
        {filteredPersons.map((person) => {
          return (
          <div key={person.name}>
            <li>
              {person.name}, {person.number} 
              <button onClick={() => deleteUser(person.id, person.name)}>delete</button>
            </li>
          </div>)
        })}
      </ul>
    </div>
  )
}

const Notification = ({ displayNotification }) => {
  if (!displayNotification) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10
  }
  return (
    <div style={notificationStyle}>
      Added something...
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [displayNotification, setDisplayNotification] = useState(false)

  useEffect(() => {
    personService.getAll()
    .then(
      initialPersons => setPersons(initialPersons)
    )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName !== '' && newNumber !== '') {
      if (persons.some(person => person.name === newName)) {

        const confirm = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
        if (confirm) {
          const personToChange = persons.find(person => person.name === newName)
          const changedPerson = {...personToChange, number: newNumber}
          personService.update(personToChange.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : changedPerson))
          })
        }
      } else {
        const nameObject = {
          name: newName,
          number: newNumber
        }
        personService.create(nameObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
      }  
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase())
  }
  const deleteUser = (id) => {
    personService.deleteUser(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id ))
    }
    )
  }
  const filteredPersons = nameFilter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  return (
    <div>

      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <Notification 

      />

      <Filter 
        handleNameFilterChange={handleNameFilterChange}
      />

      <Persons 
        filteredPersons={filteredPersons}
        deleteUser={deleteUser}
      />
    </div>
  )
}
export default App
