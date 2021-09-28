import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({ name }) => {
  return (<h1>{name}</h1>)
}

const Content = ({ parts }) => {
  return parts.map(function (e) {
    return (
      <p key={e.id}>
        {e.part} {e.exercises}
      </p>)
  })
}

const Total = ({ total }) => {
  return (<p>Number of exercises {total}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const total = course.parts.reduce((accu, val) => {
    return (val) ? accu + val.exercises : accu
  }, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
