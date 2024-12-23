import { useState } from "react"

const Button = ({text, handleFunction}) => {
  return (
    <button onClick={handleFunction}>{text}</button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const d = {}
  for (let index = 0; index <= anecdotes.length; index++) {
    d[index] = 0    
  }
  const [votes, setVotes] = useState(d)

  const updateAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelected)
  }
  const updateVotes = () => {
    const newVotes = {...votes}
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const getMostVotedAnecdote = () => {
    const maxVotes = Math.max(...Object.values(votes))
    const mostVotedIndex = Object.keys(votes).find(key => votes[key] === maxVotes)
    return anecdotes[mostVotedIndex]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p> has {votes[selected]} votes</p>
      <Button handleFunction={updateVotes} text="vote" />
      <Button handleFunction={updateAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{getMostVotedAnecdote()}</p>
    </div>
  )
}

export default App