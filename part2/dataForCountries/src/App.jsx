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

  const [countryInfo, setCountryInfo] = useState({})

  const handleCountryButton = (country) => {
    console.log(country)
  }

  if (filteredCountriesList.length > 10) {
    return (
      <div>Too many countries, specify another filter</div>
    )
  } else if (filteredCountriesList.length <= 10 && filteredCountriesList.length > 1 ){
    return (
      <ul>
        {filteredCountriesList.map(country => {
          return (
            <li key={country}>
              {country} <button onClick={() => handleCountryButton(country)}>show</button>
            </li>
          )
        })}
      </ul>
    )  
  } else if (filteredCountriesList.length === 1) {
    const country = filteredCountriesList[0]
    countriesService.getOneCountry(country)
      .then(data => {
        const newCountryInfo = {...data}
        setCountryInfo(newCountryInfo)
      })

      if (!countryInfo) {
        return (
          <div>Waiting for a response</div>
        )
      }

      return (
        <div>
          <h1>{country}</h1>
          <div>capital {countryInfo.capital[0]}</div>
          <div>area {countryInfo.area}</div>
          <br />
          <h2>languages:</h2>
          <br />
          <ul>
            {Object.keys(countryInfo.languages).map(keyLang => {
              return (<li key={keyLang}>
                {countryInfo.languages[keyLang]}
              </li>)
            })}
          </ul>
          <img src={countryInfo.flags.svg} alt={countryInfo.flags.alt} width="450" height="300" />
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
