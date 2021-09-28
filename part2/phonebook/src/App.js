import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  let notificationStyle = {
    color: (type === 'error') ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const PersonForm = ({ handleOnSubmitPersonForm }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleOnSubmit = function (event) {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    handleOnSubmitPersonForm(newPerson)
    setNewName('')
    setNewNumber('')
  }
  return (<form onSubmit={handleOnSubmit} >
    <div>
      name: <input value={newName} onChange={(event) => { setNewName(event.target.value) }} />
    </div>
    <div>
      number: <input value={newNumber} onChange={(event) => { setNewNumber(event.target.value) }} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Persons = ({ personsToShow, handleDeletePerson }) => {

  return (personsToShow.map(e => <div key={e.id}>{e.name} {e.number} <button type='button' onClick={(event) => {
    event.preventDefault();
    let confirmRemove = window.confirm(`Delete ${e.name}?`)
    if (confirmRemove)
      handleDeletePerson(e.id)
  }}>remove</button></div>))
}

const Filter = ({ handleOnChangeFilter, filterName }) => {
  return (
    <div>
      filter by: <input value={filterName} onChange={(event) => {
        handleOnChangeFilter(event.target.value.trim())
      }} />
    </div>
  )
}

const App = () => {
  const [filterName, setFilterName] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const handleOnChangeFilter = function (filterValue) {
    setFilterName(filterValue)
  }

  const handleDeletePerson = function (id) {
    let personToRemove = persons.find(e => e.id === id)
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(e => e.id !== id))

      }).catch(() => {
        setNotification({
          message: `${personToRemove.name} Was deleted on the server`,
          type: 'error'
        })
        setPersons(persons.filter(e => e.id !== id))
        setTimeout(() => {
          setNotification({
            message: null,
          })
        }, 2000)
      })
  }

  const handleOnSubmitPersonForm = (newPerson) => {
    let personToUpdate = persons.find(e => e.name === newPerson.name)
    if (personToUpdate) {
      personToUpdate.number = newPerson.number
      let confirmUpdate = window.confirm(`El ${newPerson.name} ya se encuentra en la agenda, actualizar?`)
      if (confirmUpdate) {
        personsService
          .update(personToUpdate.id, personToUpdate)
          .then(person => {
            setPersons(persons.map(e => (e.id == personToUpdate.id) ? personToUpdate : e))
            setNotification({
              message: `${personToUpdate.name} Update correctly`,
              type: 'succes'
            })
            setTimeout(() => {
              setNotification({
                message: null,
              })
            }, 2000)
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNotification({
            message: `${newPerson.name} Added correctly`,
            type: 'succes'
          })
          setTimeout(() => {
            setNotification({
              message: null,
            })
          }, 2000)
        })
    }
  }

  const personsToShow = (filterName.trim()) ? persons.filter(e => e.name.toLowerCase().includes(filterName.trim())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleOnChangeFilter={handleOnChangeFilter} />
      <h3>Add a new</h3>
      <PersonForm handleOnSubmitPersonForm={handleOnSubmitPersonForm} />
      <Notification {...notification} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )

}

export default App