import React, {useContext, useState} from 'react';
import "./PetCard.css";
import {IoHeart, IoPaw} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";
import {RiChatDeleteFill} from "react-icons/ri";
import axios from "axios";

function PetCard({name, sex, id, image, age, species, warning, warningtext, faved, shelter}) {

    async function deleteAnimal() {
        const token = localStorage.getItem("token")

        try {
            const result = await axios.delete(`http://localhost:8080/animals/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(result);
            window.location.reload();
        }
        catch (e) {console.error(e)}
    }

        const navigate = useNavigate();
        const {user, loggedIn} = useContext(AuthContext);
        const navigateToAnimal = (id) => {
            navigate(`/animals/details/${id}`)
        }
        const [deleteDialog, toggleDeleteDialog] = useState(false);

        console.log(user.role + " " + shelter + " " + user.username)
        return (
            <>
                <div
                    className="delete">{(deleteDialog === false && (user.role === "ADMIN" || user.role === "SHELTER" && shelter === user.username)) &&
                    <RiChatDeleteFill className="delete-icon" onClick={() => toggleDeleteDialog(true)}/>}
                    {(deleteDialog === true) && <>Archive {name}?
                        <button className="yes-button" onClick={deleteAnimal}>yes</button>
                        <button className="no-button" onClick={() => {
                            toggleDeleteDialog(false)
                        }}>no
                        </button>
                    </>}
                </div>
                <div className="petcard" onClick={() => navigateToAnimal(id)}>
                    <div className="pc-title"><h3>{name}</h3>
                        {(faved === true) && <IoHeart className="faved-icon"/>}
                        {(faved === false) && <IoHeart className="fav-icon"/>}</div>
                    <div className="pc-info-container">
                        <article>
                            <div className="pc-info"><h5>{species}
                                {(sex === "M") && <> ♂ </>}
                                {(sex === "F") && <> ♀ </>}
                                {(sex === "X") && <> ⚥ </>}
                                {(sex === "U") && <> ? </>}
                                {age} years</h5></div>
                            {image && <img className="pc-photo" src={image} alt="Picture of the animal"></img>}
                        </article>
                        {!image && <div className="pc-photo">
                            <div className="filler-img-container"><IoPaw className="filler-img"/></div>
                        </div>}
                    </div>
                    {warning === false && <div className="pc-not-special-needs"><p> Beginner safe </p></div>}
                    {warning === true && <div className="pc-special-needs">
                        <div className="warning"><h3>!</h3></div>
                        <p>{warningtext}</p></div>}
                </div>
            </>
        )
    }

export default PetCard;