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

const CountriesDisplayer = ({ filteredCountriesList, countriesObj }) => {

  const countryInfo = country => {

    const key = Object
      .keys(countriesObj)
      .filter(key => countriesObj[key].name.common === country)
      return countriesObj[key]
  }
  if (filteredCountriesList.length > 10) {
    return (
      <div>Too many countries, specify another filter</div>
    )
  } else if (filteredCountriesList.length <= 10 && filteredCountriesList.length > 1 ){
    return (
      <ul>
        {filteredCountriesList.map(country => <li key={country}>{country}</li>)}
      </ul>
    )  
  } else if (filteredCountriesList.length === 1) {
    const country = filteredCountriesList[0]
    const info = countryInfo(country)

    return (
      <div>
        <h1>{country}</h1>
        <div>capital {info.capital[0]}</div>
        <div>area {info.area}</div>
        <br />
        <h2>languages:</h2>
        <br />
        {/* <ul>
          {String(Object.keys(info.laguanges))}
        </ul> */}
        <img src={info.flags.svg} alt={info.flags.alt} width="300" height="300" />
        <div></div>
      </div>
    )
  } else {
    return (
      <div>No matches found</div>
    )
  }
}

const App = () => {
  const [filterText, setFilterText] = useState('')
  const [countriesObj, setCountriesObj] = useState({})
  const [countriesList, setCountriesList] = useState([])

  const handleFilterText = (event) => {
    setFilterText(event.target.value)
  }

  const filteredCountriesList = filterText === '' ?
  countriesList : countriesList.filter(
    country => country.toLowerCase().includes(filterText.toLowerCase())
  )


  useEffect(() => {
    countriesService
    .getCountries()
    .then(response => {
      const newCountriesObj = {...response}
      setCountriesObj(newCountriesObj)
      
      const countries = []
      Object
        .keys(newCountriesObj)
        .forEach(key => {
          countries.push(newCountriesObj[key].name.common)
        })
      
      setCountriesList(countries)
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
        countriesObj={countriesObj}
      />
    </div>
  )
}

export default App
