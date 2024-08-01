import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

function ShelterDetails() {
    const {id} = useParams();
    const { user } = useContext(AuthContext);

    //If this is the user that's logged in, allow editing on this page.
    if (user.username === id) {

    }

    //Show contact info, speciality, image, etc.
    return ( <> </>
        //Make UserContext to easily retrieve all user data and display that.
    )
}

export default ShelterDetails;