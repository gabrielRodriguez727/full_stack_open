import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const restUrl = 'https://restcountries.com/v3/name/'

const SearchInput = ({ getCountriesByFilterValue }) => {
  const [filterValue, setFilterValue] = useState('')

  const handleOnChangeFilterValue = (event) => {
    let value = event.target.value.trim()
    setFilterValue(value)
    getCountriesByFilterValue(value)
  }

  return (
    <div>
      <label>Search countries:</label><input value={filterValue} onChange={handleOnChangeFilterValue}></input>
    </div>
  );
}

const CountriesList = ({ countries, handleOnClickShowCountryBtn }) => {
  if (countries.length === 0) return ''
  if (countries.length > 10) return <div>Too many options....</div>
  if (countries.length === 1) return <Country {...countries[0]} />
  return (countries.map(e => <div key={e.name.common}>{e.name.common} <button type='button' onClick={() => { handleOnClickShowCountryBtn(e.name.common) }}>show</button></div>))
}

const Country = (props) => {
  console.log(process.env.REACT_APP_WEATHERSTACK_API_KEY)

  const [weatherProps, setWeatherProps] = useState({})
  const imgStyle = {
    width: '300px'
  }
  const name = props.name.common
  const capital = props.capital
  const flag = props.flags[0]
  const languages = Object.values(props.languages)
  useEffect(() => {
    let weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${capital}`
    axios
      .get(weatherUrl)
      .then(response => {
        console.log(response.data)
        setWeatherProps(response.data)
      })
  }, [])

  return (<>
    <h3>{name}</h3>
    <div>capital {capital}</div>
    <ul>languages {languages.map(e => <li key={e}>{e}</li>)}</ul>
    <img src={flag} style={{ ...imgStyle }} />
    <CountryWeather {...weatherProps} />
  </>)
}

const CountryWeather = (props) => {
  const { current, location } = props
  if (!current) return ''
  return (<>
    <h3>Weather in {location.name}</h3>
    <div>temperature: {current.temperature}</div>
    <div>description: {current.weather_descriptions.join(', ')}</div>
  </>)
}

function App() {
  const [countries, setCountries] = useState([])

  const handleOnClickShowCountryBtn = (name) => {
    setCountries(countries.filter(e => e.name.common == name))
  }

  const getCountriesByFilterValue = (value) => {
    if (value)
      axios
        .get(restUrl + value)
        .then(response => {
          console.log(response.data.length)
          setCountries(response.data)
        })
    else setCountries([])
  }

  return (
    <div>
      <SearchInput getCountriesByFilterValue={getCountriesByFilterValue} />
      <CountriesList countries={countries} handleOnClickShowCountryBtn={handleOnClickShowCountryBtn} />
    </div>
  );
}

export default App;

