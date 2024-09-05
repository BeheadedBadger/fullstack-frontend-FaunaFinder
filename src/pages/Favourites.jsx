import {AuthContext} from "../context/AuthContext.jsx";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PetCard from "../components/PetCard.jsx";
import "./Favourites.css";
import {AnimalContext} from "../context/AnimalContext.jsx";
import Loader from "../components/Loader.jsx";

function Favourites() {
    const {loggedIn, user} = useContext(AuthContext);
    const {animalData} = useContext(AnimalContext);
    const navigate = useNavigate();

    let filteredAnimals = [];
    const [animalsToDisplay, setAnimalsToDisplay] = useState([]);
    const [status, setStatus] = useState("");

    {/*Filter animals*/}
    useEffect(() => {
        function filter() {
                setStatus("loading");
                for (let i = 0; i < animalData.animals.length; i++) {
                    for (let f = 0; f < animalData.animals[i].favourites.length; f++) {
                        if (animalData.animals[i].favourites[f].username === user.username) {
                        filteredAnimals.push(animalData.animals[i]);
                    }
                }
                setAnimalsToDisplay(filteredAnimals);
                setStatus("done");
            }
        }
        void filter();
    }, [user]);

    return <div className="container-column">
        {status === "loading" && <Loader/>}
        {(!loggedIn || !user) && <><h4> You have to be logged in to add animals to your favourites. </h4>
            <Link
                to="signin"
                onClick={(e) => {
                e.preventDefault();
                navigate("/signin");
            }}>
            <h3>log in -></h3>
        </Link></>}

        {(loggedIn && user && !animalsToDisplay) &&
            <div className="no-favs">You don't have any favourites yet.
            <Link
                to="signin"
                onClick={(e) => {
                e.preventDefault();
                navigate("/animals");
            }}>
                <h3>Go to all animals -></h3>
            </Link></div>
        }

        {(loggedIn && user && animalsToDisplay) && <div className="favourites">
            Hello {user.username}! These are the animals you have added to your favourites:
                <ul>
                    {animalsToDisplay.map(animal => {
                        return (
                            <li key={animal.id}>
                                <PetCard name={animal.name}
                                         sex={animal.sex}
                                         id={animal.id}
                                         image={animal.animalPhoto}
                                         age={animal.age}
                                         species={animal.commonSpeciesName}
                                         warning={animal.warning}
                                         warningtext={animal.warningExplanation}
                                         faved = "true"/>
                            </li>
                        )
                    })}
                </ul>
        </div>}
        </div>
}

export default Favourites;