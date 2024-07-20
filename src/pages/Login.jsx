import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./Login.css"
import { AuthContext } from '../context/AuthContext';

function Login(){
    const [error, toggleError] = useState(false);
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const { login, isAuth, user } = useContext(AuthContext);

    async function logIn(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const result = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            });
            login(result.data.access_token);
        } catch(e) {
            console.log(e);
            toggleError(true);
        }
    }

    return <div className="container-column">
        {error && <div className="error-text">Something went wrong</div>}
        {(isAuth.isAuth && isAuth.user) && <><h2>Welcome {isAuth.user.username}</h2><h2>({isAuth.user.role})!</h2></>}
        {!(isAuth.isAuth) &&
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