import axios from "axios";
import React from "react";
import "./SignUp.css";
import {FaHouseUser, FaUserPlus} from "react-icons/fa";
import {FaShieldCat} from "react-icons/fa6";
import StandardButton from "../components/StandardButton";

function SignUp() {

    const [error, setError] = React.useState(null);
    const [addedSuccess, toggleAddedSuccess] = React.useState(false);
    const [role, setRole] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    async function addUser(e) {
        e.preventDefault();
        toggleAddedSuccess(false);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/register', {
                username: username,
                password: password,
                role: role,
            });

            console.log(response.data);
            if (response.data.access_token != null) {
                toggleAddedSuccess(true);
            }
        } catch (error) {
            setError(error);
        }
    }

    return <div className="container-column">
        <div className="info-text">
            <h1>Sign up!</h1> <h5>Unlock more features by signing up for your own FaunaFinder account.</h5>
        </div>
            {addedSuccess && <p className="successfully-added">Account created successfully! You can now log in.</p>}
            {!addedSuccess &&
                <form onSubmit={addUser}>
                    <label htmlFor="username"><p>Username:</p>
                        <input type="text" id="username" value={username}
                               onChange={(e) => setUsername(e.target.value)}></input>
                    </label>
                    <label htmlFor="password"><p>Password:</p>
                        <input type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <div className="radio-container"> <p>As a:</p>
                        <div className="radio">
                            <label>
                                <input type="radio" id="role" value="User" checked={role === "USER"} className="user"
                                       onChange={() => setRole("USER")}/>
                                <FaUserPlus className="radio-symbol"/>
                            <p>User (Favourite animals and donate to shelters)</p>
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" id="role" value="Shelter" checked={role === "SHELTER"}
                                   onChange={() => setRole("SHELTER")}/>
                            <FaHouseUser className="radio-symbol"/>
                            <p>Shelter (Upload animals)</p>
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" id="role" value="Admin" checked={role === "ADMIN"}
                                   onChange={() => setRole("ADMIN")}/>
                            <FaShieldCat className="radio-symbol"/>
                            <p>Admin (Help us manage the site)</p>
                        </label>
                    </div>
                </div>
                    <StandardButton size="medium" type="submit" value="Submit" text="Submit"/>
                </form>}
    </div>
}

export default SignUp;