import { AuthContext } from '../context/AuthContext';
import {useContext, useEffect, useState} from "react";
import "./UploadNewAnimal.css"
import {PiWarningOctagonFill} from "react-icons/pi";
import StandardButton from "../components/StandardButton.jsx";
import {useNavigate} from "react-router-dom";

function UploadNewAnimal(){

    const {login, isAuth, loggedIn, user} = useContext(AuthContext);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const navigateToSignIn = () => {
        navigate('/signin');
    };
    const navigateToSignUp = () => {
        navigate('/signup');
    };

    /*Check if user is logged in, and if they are logged in as a shelter*/
    useEffect(() => {
        async function checkCred() {

            if (!loggedIn) {
                console.log("Login first");
                setStatus("Login");
            }
            if (loggedIn && user.role !== "SHELTER") {
                console.log("You need to be logged in as a shelter")
                setStatus("NotShelter");
            }

            if (loggedIn && user.role === "SHELTER") {
                console.log("Nice! You can upload animals.")
                setStatus("Ready to go!");
            }
        }

        void checkCred();
    },[])

    return <div className = "container-row" >

        {/*Not signed in*/}
        {status === "Login" &&
            <div className="error">
                <div className="error-icon-container">
                    <PiWarningOctagonFill className="error-icon"/>
                </div> <h4> You have to be logged in to upload animals. </h4>
                <div className="buttons">
                    <StandardButton onclick={navigateToSignUp} size="medium" text="Create an account"/>
                    <StandardButton onclick={navigateToSignIn} size="medium" text="Log in"/>
                </div>
            </div>}

        {/*Logged in, but not a shelter*/}
        {status === "NotShelter" &&
            <div className="error">
                <div className="error-icon-container">
                    <PiWarningOctagonFill className="error-icon"/>
                </div> <h4> You have to be a shelter to upload animals. </h4>
                <div className="buttons">
                    <StandardButton onclick={navigateToSignUp} size="medium" text="Create a shelter account"/>
                    <StandardButton onclick={navigateToSignIn} size="medium" text="Log in to shelter account"/>
                </div>
            </div>}
        {status && <p>{status}</p>}
    </div>
}

export default UploadNewAnimal;