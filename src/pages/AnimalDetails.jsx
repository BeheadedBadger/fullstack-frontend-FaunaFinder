import {useParams} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AnimalContext} from "../context/AnimalContext.jsx";
import axios from "axios";
import {AuthContext} from "../context/AuthContext.jsx";
import {IoHeart} from "react-icons/io5";
import ("./AnimalDetails.css")

function AnimalDetails() {
    const {id} = useParams();
    const {animalData} = useContext(AnimalContext);
    const {loggedIn, user} = useContext(AuthContext)
    const [localAnimal, setLocalAnimal] = useState(null);
    const [status, setStatus] = useState("starting")
    const [warning, setWarning] = useState("")

    async function AddToFavourites() {
        if (loggedIn) {
            try {
                const addToFav = await axios.put(`http://localhost:8080/users/fav/${localStorage.getItem("user_username")}/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });

                console.log(addToFav);
            } catch (e) {
                console.error(e);
            }
        }
        else {
            console.log("Not logged in")
            setWarning("You have to be logged in to save animals to your favourites.");
        }
    }


    if (status === "starting") {
        setStatus("loading");
        for (let i = 0; i < animalData.animals.length; i++) {
            let externalId = animalData.animals[i].id;
            console.log(externalId.toString() + " : " + id.toString())

            if (externalId.toString() === id.toString()) {
                console.log("match found");
                setLocalAnimal(animalData.animals[i])
                {
                    console.log(animalData.animals[i].id)
                }
            }
        }
        setStatus("done");
    }

    return (<>
        {(localAnimal) && <div className="animal-details">
            {localAnimal.animalPhoto &&
                <img className="photo-animal" src={localAnimal.animalPhoto} alt={localAnimal.name}/> }
                <div className="text-animal">
                    <h2>{localAnimal.name}
                        {console.log(loggedIn + user)}
                        {loggedIn && user && user.favourites && user.favourites.includes(id) && <p>Already in favs</p>}
                        <IoHeart className="fav-icon" onClick={AddToFavourites}/>
                        </h2>
                    {warning && <p>{warning}</p>}
                    <h5>Sex: {(localAnimal.sex === "M") && <> Male </>}
                        {(localAnimal.sex === "F") && <> Female </>}
                        {(localAnimal.sex === "X") && <> Other </>}
                        {(localAnimal.sex === "U") && <> Unknown </>}</h5>
                    <h5>Species: {localAnimal.commonSpeciesName} ({localAnimal.scientificSpeciesName})</h5>
                    <hr/>
                    <p>Description: {localAnimal.description}</p>
                    {localAnimal.warningExplanation && <p>Warnings: {localAnimal.warningExplanation}</p>}
                    <hr/>
                    <h5>Interested in {localAnimal.name}? Contact:</h5>
                    <p>Shelter: {localAnimal.shelter.username}</p>
                </div>
        </div>}
        {(!localAnimal && status==="done") && <p>Animal not found</p>}
        </>
    )
}

export default AnimalDetails;