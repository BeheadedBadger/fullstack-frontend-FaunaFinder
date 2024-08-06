import React, {useCallback, useContext, useEffect, useState} from "react";
import PetCard from "../components/PetCard";
import {AnimalContext} from "../context/AnimalContext.jsx";
import "./Animals.css";
import {useNavigate, useParams} from "react-router-dom";
import {PiWarningOctagonFill} from "react-icons/pi";
import {GiDove, GiRat, GiSandSnake, GiScarabBeetle, GiTropicalFish} from "react-icons/gi";
import Loader from "../components/Loader.jsx";
import {AuthContext} from "../context/AuthContext.jsx";

function Animals() {
    const {animalData} = useContext(AnimalContext);
    const {user} = useContext(AuthContext);
    const {category} = useParams();
    const [animalsToDisplay, setAnimalsToDisplay] = useState([]);
    let filteredAnimals = [];
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    {/*Filter animals*/}
    useEffect(() => {
        function filter(e) {
        if (!category)
            for (let i = 0; i < animalData.animals.length; i++) {
                for (let f = 0; f < animalData.animals[i].favourites.length; f++) {
                    if (user.username === animalData.animals[i].favourites[f].username) {
                        animalData.animals[i].faved = true;
                    }
                    else { animalData.animals[i].faved = false; }
            }
        }

        if (category && animalData.animals) {
                setStatus("loading");
                for (let i = 0; i < animalData.animals.length; i++) {
                    const categoryToCaps = typeof animalData.animals[i].category === 'string' ? animalData.animals[i].category.toUpperCase() : "";

                    console.log(categoryToCaps + " : " + category.toUpperCase());
                    if (categoryToCaps === category.toUpperCase()) {
                        console.log(animalData.animals[i]);
                        animalData.animals[i].faved = false;
                        for (let f = 0; f < animalData.animals[i].favourites.length; f++) {
                            if (user.username === animalData.animals[i].favourites[f].username) {
                                animalData.animals[i].faved = true;
                            }
                        }
                        filteredAnimals.push(animalData.animals[i]);
                    }
                }
                console.log(category + " " + filteredAnimals.length + " " + animalData.animals.length);
                setAnimalsToDisplay(filteredAnimals);
                setStatus("done");
            }
        }
        void filter();
    }, [category]);


    const navigateToAllAnimals = () => {
        navigate('/animals');
    }

    const navigateToMammals = () => {
        setStatus("loading");
        navigate('/animals/mammals');
    };

    const navigateToReptiles = () => {
        setStatus("loading");
        navigate('/animals/reptiles');
    };

    const navigateToBirds= () => {
        setStatus("loading");
        navigate('/animals/birds');
    };

    const navigateToInvertebrates = () => {
        setStatus("loading");
        navigate('/animals/invertebrates');
    };

    const navigateToFish = () => {
        setStatus("loading");
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

    {(status === "loading") && <Loader/>}

    {(category && animalsToDisplay.length < 1 && status === "done" || animalData.animals.length < 1)
        && <div className="empty">
            <div className="error-icon-container"><PiWarningOctagonFill className="error-icon"/></div>
            <h3>No animals found!</h3>
        </div>}

    {(category && status === "done" && animalsToDisplay.length > 0) &&
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
                                faved={animal.faved}/>
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
                                         warningtext={animal.warningExplanation}
                                         faved={animal.faved}/>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>)
}

export default Animals;