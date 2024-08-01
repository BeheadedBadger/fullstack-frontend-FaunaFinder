import React, {useContext} from 'react';
import './Header.css'
import image from "../assets/FaunaFinderLogo.png"
import StandardButton from "./StandardButton";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";

function Header() {
    const [hover, toggleHover] = React.useState(false);
    const navigate = useNavigate()
    const {logout, loggedIn, user} = useContext(AuthContext);

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToSignIn = () => {
        navigate('/signin');
    };

    const navigateToRegistration = () => {
        navigate('/signup');
    };

    const navigateToUpload = () => {
        navigate('/newanimal');
    };

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const navigateToShelters = () => {
        navigate('/shelters');
    };

    const navigateToAnimals = () => {
        navigate('/animals');
    };

    return (
        <div className="header" onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
            <img onClick={navigateToHome} className="header-logo" src={image} alt="logo"/>
            {!hover && <i className="glyphicon glyphicon-menu-hamburger"></i>}
            {hover && <div className="header-links">
                <StandardButton size="small" text="Animals" onclick={navigateToAnimals}/>
                <StandardButton size="small" text="Shelters" onclick={navigateToShelters}/>
                <StandardButton size="small" text="New account" onclick={navigateToRegistration}/>
                {!loggedIn &&
                    <StandardButton size="small" text="Login" onclick={navigateToSignIn}/>
                }
                {(loggedIn && user.role === "SHELTER") &&
                    <StandardButton size="small" text="Upload animals" onclick={navigateToUpload}/>
                }
                {loggedIn && <>
                    <StandardButton size="small" text="My profile" onclick={navigateToProfile}/>
                    <StandardButton size="small" text = "Logout" onclick={logout}/>
                </>
                }
            </div>}
        </div>)
}

export default Header;