import { useState } from "react"

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

  const handleFilterText = (event) => {
    setFilterText(event.target.value)
  }

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
