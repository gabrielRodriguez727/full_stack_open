import React from 'react'



const Header = ({ name }) => {
    return (<h1>{name}</h1>)
}

const Content = ({ parts }) => {
    return parts.map(function (e) {
        return (
            <p key={e.id}>
                {e.name} {e.exercises}
            </p>)
    })
}

const Total = ({ total }) => {
    return (<p><strong>Total of exercises {total}</strong></p>)
}

const Course = ({ course }) => {
    let { name, parts } = course
    const total = parts.reduce((accu, val) => {
        return (val) ? accu + val.exercises : accu
    }, 0)

    return (<div>
        <Header name={name} />
        <Content parts={parts} />
        <Total total={total} />
    </div>)
}

export { Course }