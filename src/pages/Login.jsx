import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./Login.css"
import { AuthContext } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";
import StandardButton from "../components/StandardButton.jsx";

function Login(){
    const [error, toggleError] = useState(false);
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const { login, loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/profile");
        }
    });

    function handleChangeUsername(value) {
        toggleError(false);
        setUsername(value);
    }

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
        {!(loggedIn) &&
        <form onSubmit={logIn}>
            <label htmlFor="username"><p>Username:</p>
                <input type="text" id="username" value={username}
                       onChange={(e) => {handleChangeUsername(e.target.value)}}></input>
            </label>
            <label htmlFor="password"><p>Password:</p>
                <input type="password" id="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}></input>
            </label>

            {(username === "" || password === "") && <> <StandardButton disabled = {true} size="small" text="Submit"/>
                <>not all required fields filled in</>
            </>}
            {!(username === "" || password === "") && <StandardButton size="small" type="submit" value="Submit" text="Submit"/>}
            {error && <div className="error-text">Something went wrong! Try again.</div>}
        </form>}
    </div>
}

export default Login;