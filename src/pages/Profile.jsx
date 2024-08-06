import React, {useContext} from "react";
import { AuthContext } from '../context/AuthContext';
import {FaHouseUser, FaUser, } from "react-icons/fa";
import {FaShieldCat} from "react-icons/fa6";
import StandardButton from "../components/StandardButton.jsx";
import {useNavigate} from "react-router-dom";
import("./Profile.css");

function Profile() {
    const { loggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const navigateToUpload = () => {
        navigate('/newanimal');
    };

    const navigateToShelters = () => {
        navigate('/shelters');
    };

    const navigateToFavourites = () => {
        navigate('/favourites');
    };

    return <div className="profile-content">
    <div className="container-row">
        <div className="profile-container-column">
            {(loggedIn) && <>
            <h2>
                {(user.role === "USER") && <FaUser/>}
                {(user.role === "SHELTER") && <FaHouseUser/>}
                {(user.role === "ADMIN") && <FaShieldCat/>}
                Welcome {user.username}!
            </h2>
            {user.userPhoto && <img className="profile-picture" src={user.userPhoto} alt="profile picture"/>}
        </>}
    </div>
    <div className="profile-container-column">
        {loggedIn && <div className="profile-buttons">
            <div className="text">Suggested actions:</div>
            {user.role === "USER" && <>
                <StandardButton size="medium" text="Donate to a shelter" onclick={navigateToShelters}/> </>}
            {user.role === "SHELTER" && <>
                <StandardButton size="medium" text="Upload animals" onclick={navigateToUpload}/>
                {/*TODO add a page where the shelter can see, edit and archive animals*/}
                <StandardButton size="medium" text="View/edit animals" /> </>}
            {/*TODO add a favourites page*/}
            <StandardButton size="medium" text="View favourites" onclick={navigateToFavourites}/>
            </div>}
    </div>
    </div>
</div>
}

export default Profile;