import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./Login.css"
import { AuthContext } from '../context/AuthContext';

function Login(){
    const [error, toggleError] = useState(false);
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const { login, loggedIn, fetchUserData } = useContext(AuthContext);

    async function logIn(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const result = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            });
            localStorage.setItem("token", result.data.access_token);
            let token = result.data.access_token;
            console.log(token);
            login(token);
        } catch(e) {
            console.log(e);
            toggleError(true);
        }
    }

    return <div className="container-column">
        {error && <div className="error-text">Something went wrong</div>}
        {!(loggedIn) &&
        <form onSubmit={logIn}>
            <label htmlFor="username"><p>Username:</p>
                <input type="text" id="username" value={username}
                       onChange={(e) => setUsername(e.target.value)}></input>
            </label>
            <label htmlFor="password"><p>Password:</p>
                <input type="password" id="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <button type="submit" value="Submit">Submit</button>
        </form>}
    </div>
}

export default Login;