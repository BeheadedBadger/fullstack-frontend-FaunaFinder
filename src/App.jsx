import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import Animals from "./pages/Animals.jsx"
import Shelters from "./pages/Shelters.jsx"
import WallOfFame from "./pages/WallOfFame.jsx"
import UploadNewAnimal from "./pages/UploadNewAnimal.jsx"
import React, {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import AnimalDetails from "./pages/AnimalDetails.jsx";

function App() {
    const {loggedIn} = useContext(AuthContext);

    return (
        <div className="page-container">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={loggedIn === true ? <Profile/> : <Navigate to="/signin"/>}/>
                    <Route path="/signin" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/animals" element={<Animals/>}/>
                    <Route path="/animals/:category" element={<Animals/>} />
                    <Route path="/animals/details/:id" element={<AnimalDetails/>}/>
                    <Route path="/shelters" element={<Shelters/>}/>
                    <Route path="/shelters/details/:id" element={<ShelterDetails/>}/>
                    <Route path="/walloffame" element={<WallOfFame/>}/>
                    <Route path="/newanimal" element={<UploadNewAnimal/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
