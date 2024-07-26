import React, {useCallback, useContext, useEffect, useState} from "react";
import PetCard from "../components/PetCard";
import {AnimalContext} from "../context/AnimalContext.jsx";
import "./Animals.css";

function Animals() {
    const [category, setCategory] = useState("");
    const {animalData} = useContext(AnimalContext);

    return (
        <div className="container-row">
            {(animalData.status === "done" && animalData.animals) &&
                <ul>
                    {animalData.animals.map(animal => {
                        return (
                            <li key={animal.id}>
                                   <PetCard name={animal.name}
                                            sex = {animal.sex}
                                         id={animal.id}
                                         image={animal.animalPhoto}
                                         age={animal.age}
                                         species={animal.commonSpeciesName}
                                         warning={animal.warning}
                                         warningtext={animal.warningExplanation}/>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>)
}

export default Animals;