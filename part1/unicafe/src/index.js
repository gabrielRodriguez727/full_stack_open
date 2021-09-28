import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({ text, handleClick }) => {
  return (<button onClick={() => { handleClick() }}>{text}</button>)
}

const Statistics = ({ props }) => {
  console.log(props)
  const { good, neutral, bad } = { ...props }
  const all = good + neutral + bad
  if (all === 0) return (<div>No statistics</div>)
  const avg = ((good - bad) / all).toFixed(2)
  const positivesPercentage = ((good * 100) / all).toFixed(2)
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="avg" value={avg} />
      <StatisticLine text="positivesPercentage" value={positivesPercentage} />
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>{text} {value}</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <FeedbackButton handleClick={() => { setGood(good + 1) }} text={"good"}></FeedbackButton>
        <FeedbackButton handleClick={() => { setNeutral(neutral + 1) }} text={"neutral"}></FeedbackButton>
        <FeedbackButton handleClick={() => { setBad(bad + 1) }} text={"bad"}></FeedbackButton>
      </div>
      <Statistics props={{ good, neutral, bad }}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)