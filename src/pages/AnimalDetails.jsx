import {useParams} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AnimalContext} from "../context/AnimalContext.jsx";
import ("./AnimalDetails.css")

function AnimalDetails() {
    const {id} = useParams();
    const {animalData} = useContext(AnimalContext);
    const [localAnimal, setLocalAnimal] = useState(null);
    const [status, setStatus] = useState("starting")

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
            {console.log(localAnimal)}
            {localAnimal.animalPhoto &&
                <img className="photo-animal" src={localAnimal.animalPhoto} alt={localAnimal.name}/> }
                <div className="text-animal">
                    <h2>{localAnimal.name}</h2>
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
                    <p>Shelter: {localAnimal.shelter}</p>
                </div>
        </div>}
        {(!localAnimal && status==="done") && <p>Animal not found</p>}
        </>
    )
}

export default AnimalDetails;