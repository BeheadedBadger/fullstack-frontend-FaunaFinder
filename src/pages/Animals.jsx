import React, {useCallback, useContext, useEffect, useState} from "react";
import PetCard from "../components/PetCard";
import {AnimalContext} from "../context/AnimalContext.jsx";
import "./Animals.css";
import {useParams} from "react-router-dom";
import {PiWarningOctagonFill} from "react-icons/pi";

function Animals() {
    const {animalData} = useContext(AnimalContext);
    const {category} = useParams();
    let filteredAnimals = [];

    if (category) {
        for (let i = 0; i < animalData.animals.length; i++) {
            if (animalData.animals[i].category !== null) {
                console.log(animalData);

                let Ucategory = category.toUpperCase();
                let Udata = animalData.animals[i].category.toUpperCase()
                console.log(Ucategory + " : " + "animal : " + Udata);
                if (animalData.animals[i].category.toUpperCase() === category.toUpperCase()) {
                    filteredAnimals.push(animalData.animals[i]);
                }
            }
        }
    }

    return (
        <div className="container-row">
            {(category && filteredAnimals.length < 1 || animalData.animals.length < 1)
                && <div className="empty">
                    <div className="error-icon-container"><PiWarningOctagonFill className="error-icon"/></div>
                    <h3>No animals found!</h3>
                </div>}

            {(category && filteredAnimals.length > 0) &&
                <ul>
                {filteredAnimals.map(animal => {
                        return (
                            <li key={animal.id}>
                                <PetCard name={animal.name}
                                         sex={animal.sex}
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

            {(!category && animalData.status === "done" && animalData.animals) &&
                <ul>
                    {animalData.animals.map(animal => {
                        return (
                            <li key={animal.id}>
                                <PetCard name={animal.name}
                                         sex={animal.sex}
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