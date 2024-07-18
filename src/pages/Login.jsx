import React from "react";
import axios from "axios";
import "./Login.css"

function Login(){
    const [error, setError] = React.useState(null);
    const [loggedIn, toggleLoggedIn] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    async function logIn(e) {
        e.preventDefault();
        toggleLoggedIn(false);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            });

            console.log(response.data);
            if (response.data.access_token != null) {
                toggleLoggedIn(true);
            }
        } catch (error) {
            setError(error);
        }
    }

    return <div className="container-column">
    {loggedIn && <h2>Welcome {username}!</h2>}
    {!loggedIn &&
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