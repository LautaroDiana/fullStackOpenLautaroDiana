import { useState } from "react"

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  ) 
}
const StatisticLine = ({name, value}) => {
  return (
    <p>{name} {value}</p>
  )
}
const Statistics = ({good, neutral, bad, total, sum}) => {
  if (total.length === 0) {
    return(
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
  return(      
  <div>
    <h1>statistics</h1>
    <StatisticLine name="good" value={good}/>
    <StatisticLine name="neutral" value={neutral}/>
    <StatisticLine name="bad" value={bad}/>
    <StatisticLine name="all" value={total.length}/>
    <StatisticLine name="average" value={(sum / total.length) * 100 + "%"}/>
    <StatisticLine name="positive" value={(good / total.length) * 100 + "%"}/>
  </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState([])
  const [sum, setSum] = useState(0)

  // Handlers
  const handleGood = () => {
    const newGoodValue = good + 1
    const newTotal = total.concat(1)
    const newSum = sum + 1
    setGood(newGoodValue)
    setTotal(newTotal)
    setSum(newSum)
  }
  const handleNeutral = () => {
    const newNeutralValue = neutral + 1
    const newTotal = total.concat(0)
    setNeutral(newNeutralValue)
    setTotal(newTotal)
  }
  const handleBad = () => {
    const newBadValue = bad + 1
    const newTotal = total.concat(-1)
    const newSum = sum - 1
    setBad(newBadValue)
    setTotal(newTotal)
    setSum(newSum)
  }

  return (
    <div>
        <h1>give feedback</h1>
        <Button text='good' handleClick={handleGood}/>
        <Button text='neutral' handleClick={handleNeutral}/>
        <Button text='bad' handleClick={handleBad}/>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} sum={sum}/>
    </div>
  )
}

export default App