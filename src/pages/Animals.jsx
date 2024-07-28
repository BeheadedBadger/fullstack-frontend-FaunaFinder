import React, {useCallback, useContext, useEffect, useState} from "react";
import PetCard from "../components/PetCard";
import {AnimalContext} from "../context/AnimalContext.jsx";
import "./Animals.css";
import {useNavigate, useParams} from "react-router-dom";
import {PiWarningOctagonFill} from "react-icons/pi";
import {GiDove, GiRat, GiSandSnake, GiScarabBeetle, GiTropicalFish} from "react-icons/gi";

function Animals() {
    const {animalData} = useContext(AnimalContext);
    const {category} = useParams();
    let filteredAnimals = [];
    const navigate = useNavigate();

    if (category) {
        for (let i = 0; i < animalData.animals.length; i++) {
            if (animalData.animals[i].category !== null) {
                console.log(animalData);

                if (animalData.animals[i].category.toUpperCase() === category.toUpperCase()) {
                    filteredAnimals.push(animalData.animals[i]);
                }
            }
        }
    }

    const navigateToAllAnimals = () => {
        navigate('/animals');
    }

    const navigateToMammals = () => {
        navigate('/animals/mammals');
    };

    const navigateToReptiles = () => {
        navigate('/animals/reptiles');
    };

    const navigateToBirds= () => {
        navigate('/animals/birds');
    };

    const navigateToInvertebrates = () => {
        navigate('/animals/invertebrates');
    };

    const navigateToFish = () => {
        navigate('/animals/fish');
    };

    return (
        <div className="container-row">
            <div className="category-buttons-animals">
                {(category === "mammals") && <button className="on" type="button" onClick={navigateToAllAnimals}>
                    <p>Mammals</p> <GiRat className="button-icon"/></button>}
                {!(category === "mammals") && <button className="off" type="button" onClick={navigateToMammals}>
                    <p>Mammals</p> <GiRat className="button-icon"/></button>}

                {(category === "reptiles") && <button className="on" type="button" onClick={navigateToAllAnimals}>
                    <p>Reptiles</p> <GiSandSnake className="button-icon"/></button>}
                {!(category === "reptiles") && <button className="off" type="button" onClick={navigateToReptiles}>
                    <p>Reptiles</p> <GiSandSnake className="button-icon"/></button>}

                {(category === "birds") && <button className="on" type="button" onClick={navigateToAllAnimals}>
                    <p>Birds</p> <GiDove className="button-icon"/></button>}
                {!(category === "birds") && <button className="off" type="button" onClick={navigateToBirds}>
                    <p>Birds</p> <GiDove className="button-icon"/></button>}

                {(category === "invertebrates") && <button className="on" type="button" onClick={navigateToAllAnimals}>
                    <p>Bugs</p> <GiScarabBeetle className="button-icon"/></button>}
                {!(category === "invertebrates") && <button className="off" type="button" onClick={navigateToInvertebrates}>
                    <p>Bugs</p> <GiScarabBeetle className="button-icon"/></button>}

                {(category === "fish") && <button className="on" type="button" onClick={navigateToAllAnimals}>
                    <p>Fish</p> <GiTropicalFish className="button-icon"/></button>}
                {!(category === "fish") && <button className="off" type="button" onClick={navigateToFish}>
                    <p>Fish</p> <GiTropicalFish className="button-icon"/></button>}
            </div>

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
        </ul>}

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