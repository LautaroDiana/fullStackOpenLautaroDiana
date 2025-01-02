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

const CountriesDisplayer = ({ filteredCountriesList }) => {
  return (
    <ul>
      {filteredCountriesList.map(country => <li key={country}>{country}</li>)}
    </ul>
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
      
      const newFilteredCountries = []
      Object
        .keys(newCountriesObj)
        .forEach(key => {
          newFilteredCountries.push(newCountriesObj[key].name.common)
        })
      
      setFilteredCountriesList(newFilteredCountries)
    })
    .then(() => console.log("done!"))
  }
  , [])

  return (
    <div>
      <h1>Hello!</h1>
      <Filter 
        handleFilterText={handleFilterText}
      />
      <CountriesDisplayer 
        filteredCountriesList={filteredCountriesList}
      />
    </div>
  )
}

export default App
