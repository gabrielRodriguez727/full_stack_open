import React, { useState } from 'react'


const LoginForm = ({ handleLoginForm }) => {

    let [username, setUserName] = useState('')
    let [password, setPassword] = useState('')

    function handleOnChange(event) {
        if (event.target.id == 'loginUserName') {
            setUserName(event.target.value)
        } else {
            setPassword(event.target.value)
        }
    }

    function handleOnSubmit(event) {
        event.preventDefault()
        let passwordTrimed = password.trim()
        let usernameTrimed = username.trim()
        if (passwordTrimed && usernameTrimed) {
            handleLoginForm({ password: passwordTrimed, username: usernameTrimed })
        }

    }

    return (<div>
        <form onSubmit={handleOnSubmit}>
            <div>
                username
                <input id='loginUserName' name="Username" type="text" value={username} onChange={handleOnChange} />
            </div>
            <div>
                password
                <input id='loginPassword' name="Password" type="text" value={password} onChange={handleOnChange} />
            </div>
            <button type="submit">login</button>
        </form>
    </div>)
}



export default LoginForm