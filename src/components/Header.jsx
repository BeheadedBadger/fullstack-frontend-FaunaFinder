import React from 'react';
import './Header.css'
import image from "../assets/FaunaFinderLogo.png"
import StandardButton from "./StandardButton";
import {useNavigate} from "react-router-dom";

function Header() {
    const [hover, toggleHover] = React.useState(false);
    const navigate = useNavigate();

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

    return (
        <div className="header" onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
            <img onClick={navigateToHome} className="header-logo" src={image} alt="logo"/>
            {!hover && <i className="glyphicon glyphicon-menu-hamburger"></i>}
            {hover && <div className="header-links">
                <StandardButton size="small" text="New account" onclick={navigateToRegistration}/>
                {/*ToDo only show if not logged in*/}
                <StandardButton size="small" text="Login" onclick={navigateToSignIn}/>
                {/*ToDo only show if logged in as shelter*/}
                <StandardButton size="small" text="Upload animals" onclick={navigateToUpload}/>
                {/*ToDo only show if logged in*/}
                <StandardButton size="small" text="My profile" onclick={navigateToProfile}/></div>}
        </div>
    )
}

export default Header;