import React from 'react';
import "./PetCard.css";
import {IoPaw} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

function PetCard({name, sex, id, image, age, species, warning, warningtext}) {

    const navigate = useNavigate();
    const navigateToAnimal = (id) => {
        navigate(`/animals/details/${id}`)
    }

    return (
        <div className="petcard" onClick={() => navigateToAnimal(id)}>
            <div className="pc-title"><h3>{name}</h3><h3>♡</h3></div>
            <div className="pc-info-container">
                <article>
                    <div className="pc-info"><h5>{species}
                        {(sex === "M") && <> ♂ </>}
                        {(sex === "F") && <> ♀ </>}
                        {(sex === "X") && <> ⚥ </>}
                        {(sex === "U") && <> ? </>}
                        {age} years</h5></div>
                    {image && <img className="pc-photo" src={image} alt="Picture of the animal"></img>}</article>
                {!image && <div className="pc-photo"> <div className="filler-img-container"><IoPaw className="filler-img"/></div></div>}
                {/*<div className="pc-description"><p>{description}</p></div>*/}
                {/*Location where the animal is currently kept*/}
            </div>
            {warning === false && <div className="pc-not-special-needs"><p> Beginner safe </p></div>}
            {warning === true && <div className="pc-special-needs">
                <div className="warning"><h3>!</h3></div>
                <p>{warningtext}</p></div>}
        </div>
    )
}

export default PetCard;