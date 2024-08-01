import React, {useContext} from "react";
import { AuthContext } from '../context/AuthContext';
import {FaHouseUser, FaUser, } from "react-icons/fa";
import {FaShieldCat} from "react-icons/fa6";
import StandardButton from "../components/StandardButton.jsx";
import("./Profile.css");

function Profile() {

    const { loggedIn, user } = useContext(AuthContext);

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
            <StandardButton size="medium" text="Option 1" />
            <StandardButton size="medium" text="Option 2" />
            <StandardButton size="medium" text="Option 3" />
        </div>}
    </div>
    </div>
</div>
}

export default Profile;