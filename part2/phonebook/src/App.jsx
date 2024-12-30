import { useState, useEffect } from 'react'
import axios from 'axios'
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

const Persons = ({filteredPersons}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => <li key={person.name}>{person.name}, {person.number}</li>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService.getAll()
    .then(
      initialPersons => setPersons(initialPersons)
    )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.name != '' && persons.number != '') {
      if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
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
        // axios.post("http://localhost:3001/persons", nameObject)
        //   .then(response => {
        //     console.log("response data", response.data);
        //     console.log("nameObject", nameObject);
        //     setPersons(persons.concat(nameObject))
        //     setNewName('')
        //     setNewNumber('')
        //   }) 
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
  const filteredPersons = nameFilter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  return (
    <div>
      <Filter 
        handleNameFilterChange={handleNameFilterChange}
      />

      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <Persons 
        filteredPersons={filteredPersons}
      />
    </div>
  )
}
export default App
