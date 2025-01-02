import { useState, useEffect } from "react"
import countriesService from "./services/countries"

const Filter = ({ handleFilterText }) => {
  return (
    <div>
      find countries
      <input type="text" onChange={handleFilterText}/>
    </div>
  )
}

const App = () => {
  const [filterText, setFilterText] = useState('')
  const [countriesObj, setCountriesObj] = useState({})
  const [filteredCountriesList, setFilteredCountriesList] = useState([])

  const handleFilterText = (event) => {
    setFilterText(event.target.value)
  }


  useEffect(() => {
    countriesService
    .getCountries()
    .then(response => {
      const newCountriesObj = {...response}
      setCountriesObj(newCountriesObj)
    })
    .then(() => console.log("done!"))
  }
  , [])

  console.log(countriesObj)

  return (
    <div>
      <h1>Hello!</h1>
      <Filter 
        handleFilterText={handleFilterText}
      />
    </div>
  )
}

export default App
