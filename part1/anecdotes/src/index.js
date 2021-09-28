import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const initAnecdotes = [
    {
      id: 1,
      anecdote: 'If it hurts, do it more often',
      votes: 0
    },
    {
      id: 2,
      anecdote: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      id: 3,
      anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      id: 4,
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      id: 5,
      anecdote: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      id: 6,
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      id: 7,
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
      votes: 0
    }
  ]

  const [anecdotes, setAnecdotes] = useState(initAnecdotes)
  const [selected, setSelected] = useState(0)

  const mostVotedAnecdote = anecdotes.reduce((acc, val) => { 
return (val.votes > acc.votes)? val : acc
  }, anecdotes[0])

  function voteSelectedAnecdote() {
    let selectedAnecdote = anecdotes[selected]
    selectedAnecdote.votes = selectedAnecdote.votes + 1
    let changeAnecdotes = anecdotes.map((e, i) => { return (i == selected) ? selectedAnecdote : e })
    setAnecdotes(changeAnecdotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected].anecdote}
      <div>has votes {anecdotes[selected].votes}</div>
      <div>
        <button onClick={() => {
          voteSelectedAnecdote()
        }}>vote</button>
        <button onClick={() => {
          let randomAnecdoteIndex = randomIntFromInterval(0, anecdotes.length - 1)
          setSelected(randomAnecdoteIndex)
        }}>next anecdote</button></div>
      <h1>Anecdote whit most votes</h1>
      {mostVotedAnecdote.anecdote}
      <div>has votes {mostVotedAnecdote.votes}</div>
    </div>
  )
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

ReactDOM.render(<App />,
  document.getElementById('root')
)