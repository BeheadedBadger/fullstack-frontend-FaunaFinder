import React, {useContext, useEffect} from "react";
import axios from "axios";
import "./Login.css"
import AuthContextProvider, {AuthContext} from "../context/AuthContext";

function Login(){
    const [error, setError] = React.useState(null);
    const [loggedIn, toggleLoggedIn] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [role, setRole] = React.useState("");
    const {AuthContextProvider, fetchUserData} = useContext(AuthContext);

    async function logIn(e) {
        e.preventDefault();
        toggleLoggedIn(false);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            });

            if (response.data.access_token != null) {
                let token = response.data.access_token;
                localStorage.setItem("Token", token);

                toggleLoggedIn(true);
                try {
                    const result = await axios.get(`http://localhost:8080/users/${username}`)
                    setRole(result.data.role);
                } catch (e) {
                    console.error(e);
                }
            }
        } catch (error) {
            setError(error);
        }
    }

    return <div className="container-column">
    {(role && loggedIn) && <><h2>Welcome {username}</h2><h2>({role})!</h2></>}
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