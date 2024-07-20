import axios from "axios";
import React, {useContext} from "react";
import "./SignUp.css";
import {FaHouseUser, FaUserPlus} from "react-icons/fa";
import {FaShieldCat} from "react-icons/fa6";
import AuthContextProvider, {AuthContext} from "../context/AuthContext";
import {GiDove, GiRat, GiSandSnake, GiScarabBeetle, GiSnake, GiTropicalFish} from "react-icons/gi";
import CustomRadioButton from "../components/CustomRadioButton";
import StandardButton from "../components/StandardButton";

function SignUp() {

    const [error, setError] = React.useState(null);
    const [addedSuccess, toggleAddedSuccess] = React.useState(false);
    const [role, setRole] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [speciality, setSpeciality] = React.useState("");
    const { AuthContextProvider } = useContext(AuthContext);

    async function addUser(e) {
        e.preventDefault();
        toggleAddedSuccess(false);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/register', {
                username: username,
                password: password,
                role: role,
                image: image,
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
        {/*User already logged in?*/}

        {/*Unlock shelter options if shelter is selected*/}

        {/*required and non-required fields*/}

        <div className="info-text">
            <h1>Sign up!</h1> <h5>Unlock more features by signing up for your own FaunaFinder account.</h5>
        </div>
            {addedSuccess && <p className="successfully-added">Account created successfully! You can now log in.</p>}
            {!addedSuccess &&
                <form onSubmit={addUser}>
                    <div className="input-container">
                        <div className="input-block">
                            <label htmlFor="username"><p>Username:</p>
                                <input type="text" id="username" value={username}
                                       onChange={(e) => setUsername(e.target.value)}></input>
                            </label>
                            <label htmlFor="password"><p>Password:</p>
                                <input type="password" id="password" value={password}
                                       onChange={(e) => setPassword(e.target.value)}></input>
                            </label>
                        </div>
                        <div className="input-block">
                            <p>Profile picture:</p>
                            <label htmlFor="image">
                                <input type="file" onChange={(e) => setImage(e.target.value)}></input>
                            </label>
                        </div>
                    </div>
                    <p>As a:</p>
                    {/*TODO turn these radio buttons into components with callback function*/}
                    <div className="radio-container">
                        <input type="radio" id="user" value="User" checked={role === "USER"}
                               className="user"
                               onChange={() => setRole("USER")}/>
                        <label htmlFor="user">
                            <div className="status">
                                {(role==="USER") && <div className="on"><p>User</p> <FaUserPlus className="radio-symbol"/></div>}
                                {!(role === "USER") && <div className="off"><p>User</p> <FaUserPlus className="radio-symbol"/></div>}
                            </div>
                        </label>
                        <input type="radio" id="shelter" value="Shelter" checked={role === "SHELTER"}
                                className="shelter"
                                onChange={() => setRole("SHELTER")}/>
                        <label htmlFor="shelter">
                            <div className="status">
                                {(role === "SHELTER") &&
                                    <div className="on"><p>Shelter</p> <FaHouseUser className="radio-symbol"/></div>}
                                {!(role === "SHELTER") &&
                                    <div className="off"><p>Shelter</p> <FaHouseUser className="radio-symbol"/></div>}
                            </div>
                        </label>
                        <input type="radio" id="admin" value="Admin" checked={role === "ADMIN"}
                               className="admin"
                               onChange={() => setRole("ADMIN")}/>
                        <label htmlFor="admin">
                            <div className="status">
                                {(role === "ADMIN") &&
                                    <div className="on"><p>Admin</p> <FaShieldCat className="radio-symbol"/></div>}
                                {!(role === "ADMIN") &&
                                    <div className="off"><p>Admin</p> <FaShieldCat className="radio-symbol"/></div>}
                            </div>
                        </label>
                    </div>
                    {(role === "SHELTER") && <div className="input-box">
                        <p>What type of animals does your shelter/rescue specialize in?</p>
                        <input type="radio" id="mammals" value="Mammals" checked={speciality === "Mammals"}
                               className="mammals"
                               onChange={() => setSpeciality("Mammals")}/>
                        <label htmlFor="mammals">
                            <div className="status">
                                {(speciality === "Mammals") &&
                                    <div className="on"><p>Mammals</p> <GiRat className="radio-symbol"/></div>}
                                {!(speciality === "Mammals") &&
                                    <div className="off"><p>Mammals</p> <GiRat className="radio-symbol"/></div>}
                            </div>
                        </label>
                        <input type="radio" id="reptiles" value="Reptiles" checked={speciality === "Reptiles"}
                               className="reptiles"
                               onChange={() => setSpeciality("Reptiles")}/>
                        <label htmlFor="reptiles">
                            <div className="status">
                                {(speciality === "Reptiles") &&
                                    <div className="on"><p>Reptiles</p> <GiSandSnake className="radio-symbol"/></div>}
                                {!(speciality === "Reptiles") &&
                                    <div className="off"><p>Reptiles</p> <GiSandSnake className="radio-symbol"/></div>}
                            </div>
                        </label>
                        <input type="radio" id="birds" value="Birds" checked={speciality === "Birds"}
                               className="birds"
                               onChange={() => setSpeciality("Birds")}/>
                        <label htmlFor="birds">
                            <div className="status">
                                {(speciality === "Birds") &&
                                    <div className="on"><p>Birds</p> <GiDove className="radio-symbol"/></div>}
                                {!(speciality === "Birds") &&
                                    <div className="off"><p>Birds</p> <GiDove className="radio-symbol"/></div>}
                            </div>
                        </label>
                        <input type="radio" id="invertebrates" value="Invertabrates"
                               checked={speciality === "Invertebrates"}
                               className="invertebrates"
                               onChange={() => setSpeciality("Invertebrates")}/>
                        <label htmlFor="invertebrates">
                            <div className="status">
                                {(speciality === "Invertebrates") &&
                                    <div className="on"><p>Invertebrates</p> <GiScarabBeetle className="radio-symbol"/></div>}
                                {!(speciality === "Invertebrates") &&
                                    <div className="off"><p>Invertebrates</p> <GiScarabBeetle className="radio-symbol"/></div>}
                            </div>
                        </label>
                        <input type="radio" id="fish" value="Fish"
                               checked={speciality === "Fish"}
                               className="fish"
                               onChange={() => setSpeciality("Fish")}/>
                        <label htmlFor="fish">
                            <div className="status">
                                {(speciality === "Fish") &&
                                    <div className="on"><p>Fish</p> <GiTropicalFish className="radio-symbol"/></div>}
                                {!(speciality === "Fish") &&
                                    <div className="off"><p>Fish</p> <GiTropicalFish className="radio-symbol"/></div>}
                            </div>
                        </label>
                    </div>}
                    <button type="submit" value="Submit">Submit</button>
                </form>}
    </div>
}

export default SignUp;