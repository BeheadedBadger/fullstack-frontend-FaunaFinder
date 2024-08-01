import React, {useContext} from "react";
import { AuthContext } from '../context/AuthContext';

function Profile() {

    const { fetchUserData, loggedIn, user } = useContext(AuthContext);

    return <div className="container-column">
        {(loggedIn) && <>
            <h2>Welcome {user.username}</h2>
            <h2>({user.role})!</h2>
            {user.userPhoto && <img src={user.userPhoto} alt="profile picture"/>}
        </>}
    </div>
}

export default Profile;