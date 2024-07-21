import React, {useContext} from "react";
import { AuthContext } from '../context/AuthContext';

function Profile() {

    const { login, isAuth, user } = useContext(AuthContext);

    console.log(isAuth);
    return <div className="container-column">
        {(isAuth.isAuth) && <>
            <h2>Welcome {isAuth.user.username}</h2>
            <h2>({isAuth.user.role})!</h2>
            {console.log(isAuth.user.userPhoto)}
            {isAuth.user.username && <img src={isAuth.user.userPhoto} alt="profile picture"/>}
        </>}
    </div>
}

export default Profile;