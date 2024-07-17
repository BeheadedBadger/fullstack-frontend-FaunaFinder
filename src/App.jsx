import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from "./components/Header.jsx";
import PetCard from "./components/PetCard.jsx";
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import Animals from "./pages/Animals.jsx"
import Shelters from "./pages/Shelters.jsx"
import WallOfFame from "./pages/WallOfFame.jsx"
import React, {useContext, useState} from 'react';
import {AuthContext} from './context/AuthContext';

function App() {
    const {isLoggedIn, stateChangeHandler} = useContext(AuthContext);
    
    return (
        <div className="page-container">
            <div>
                <Header/>
                <div className="fakecontent">
                    <PetCard name="Basil"
                             species="Ferret"
                             sex="Male"
                             age="3"
                             img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                             description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                             isSpecialneeds={false}
                             warnings="Needs all of your attention all of the time."
                    />
                    <PetCard name="Atl"
                             species="Boa Constrictor"
                             sex="Male"
                             age="16"
                             img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                             description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                             isSpecialneeds={true}
                             warnings="BIG and can bite."
                    />
                </div>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={isLoggedIn === true ? <Profile/> : <Navigate to="/Login"/>}/>
                    <Route path="/signin" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/animals" element={<Animals/>}/>
                    <Route path="/shelters" element={<Shelters/>}/>
                    <Route path="/walloffame" element={<WallOfFame/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
