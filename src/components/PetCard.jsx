import React from 'react';
import "./PetCard.css";

function PetCard({name, species, sex, age, img, description, isSpecialneeds, warnings}) {
    return (<>
        <div className="petcard">
            <div className="pc-title"><h2>{name}</h2><h1>♡</h1></div>
            <div className="pc-info-container">
                <article>
                    <div className="pc-info"><h3>{species} ♂ {age} years</h3></div>
                    <img className="pc-photo" src={img} alt="Picture of {name}"></img></article>
                {/*<div className="pc-description"><p>{description}</p></div>*/}
                {/*Location where the animal is currently kept*/}
            </div>
            {isSpecialneeds === false && <div className="pc-not-special-needs"> <p> Beginner safe </p></div>}
            {isSpecialneeds === true && <div className="pc-special-needs"> <div className="warning"><h1>!</h1></div> <p>{warnings}</p></div>}
        </div>
    </>);
}

export default PetCard;