import React from 'react';
import "./PetCard.css";

function PetCard({name, id, image, age, species, warning, warningtext}) {

    return (
        <div className="petcard">
            <div className="pc-title"><h3>{name}</h3><h3>♡</h3></div>
            <div className="pc-info-container">
                <article>
                    <div className="pc-info"><h5>{species} ♂ {age} years</h5></div>
                    {image && <img className="pc-photo" src={image} alt="Picture of the animal"></img>}</article>
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