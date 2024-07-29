import React, { useEffect, useState} from "react";
import "./UploadNewAnimal.css"
import {PiWarningOctagonFill} from "react-icons/pi";
import StandardButton from "../components/StandardButton.jsx";
import {useNavigate} from "react-router-dom";
import {GiDove, GiRat, GiSandSnake, GiScarabBeetle, GiTropicalFish} from "react-icons/gi";
import axios from "axios";

function UploadNewAnimal(){
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    /*Animal Info*/
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("U");
    const [commonSpeciesName, setCommonSpeciesName] = useState("");
    const [scientificSpeciesName, setScientificSpeciesName] = useState("");
    const [warning, setWarning] = useState(false);
    const [warningExplanation, setWarningExplanation] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSpecies = () => {
        let selectionbox = document.getElementById("species");
        setCommonSpeciesName(selectionbox.options[selectionbox.selectedIndex].value)
        setScientificSpeciesName(selectionbox.options[selectionbox.selectedIndex].id)
    }
    const handleSex = () => {
        let selectionbox = document.getElementById("sex");
        setSex(selectionbox.options[selectionbox.selectedIndex].value)
    }
    function handleImageChange(e) {
        e.preventDefault();

        const uploadedImage = e.target.files[0];
        setImage(e.target.files[0]);

        setPreviewURLPhoto(URL.createObjectURL(uploadedImage));
    }

    const [previewURLPhoto, setPreviewURLPhoto] = React.useState("");
    const [image, setImage] = React.useState(null);

    let username = null;
    let role = null;
    let loggedIn = false;
    let token = null;

    const navigateToSignIn = () => {
        navigate('/signin');
    };
    const navigateToSignUp = () => {
        navigate('/signup');
    };

    /*Check if user is logged in, and if they are logged in as a shelter*/
    useEffect(() => {
        async function checkCred() {

            loggedIn = localStorage.getItem("loggedin")
            username = localStorage.getItem("user_username");
            role = localStorage.getItem("user_role");
            token = localStorage.getItem("token");

            console.log("On loading the page, the token is:" + token);

            if (!loggedIn) {
                console.log("Login first");
                setStatus("Login");
            }
            if (loggedIn && role !== "SHELTER") {
                console.log("You need to be logged in as a shelter")
                setStatus("NotShelter");
            }

            if (loggedIn && role === "SHELTER") {
                console.log("Nice! You can upload animals.")
                setStatus("Authorized");
            }
        }

        void checkCred();
    },[])

    async function sendImage(token, id, image) {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const result = await axios.post(`http://localhost:8080/animals/${id}/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${ token }`,
                },
            });
            console.log(result);
        }
        catch (error) {
            console.error( error );
        }
    }

    async function addAnimal(e) {
        e.preventDefault();
        console.log("Add animal attempt");

        token = localStorage.getItem("token");

        try {
            const result = await axios.post("http://localhost:8080/animals",
                {
                        name: name,
                        age: age,
                        sex: sex,
                        commonSpeciesName: commonSpeciesName,
                        scientificSpeciesName: scientificSpeciesName,
                        warning: warning,
                        warningExplanation: warningExplanation,
                        description: description,
                        category: category
                    },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(result);
            const id = result.data.id;
            console.log("Successfully added animal.");

            //Assign to shelter
            try {
                const assigntoshelter = await axios.put(`http://localhost:8080/users/${localStorage.getItem("user_username")}/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                console.log(assigntoshelter);
            }
            catch (e) {
                console.error(e);
            }

            //Upload image
            if (image !== null) {
                console.log(image);
                await sendImage(localStorage.getItem("token"), id, image);
            }

            console.log("Finished adding animal");
        } catch (error) {
            console.log(error);
        }
    }


    return <div className = "container-row" >

        {/*Not signed in*/}
        {status === "Login" &&
            <div className="error">
                <div className="error-icon-container">
                    <PiWarningOctagonFill className="error-icon"/>
                </div> <h4> You have to be logged in to upload animals. </h4>
                <div className="buttons">
                    <StandardButton onclick={navigateToSignUp} size="medium" text="Create an account"/>
                    <StandardButton onclick={navigateToSignIn} size="medium" text="Log in"/>
                </div>
            </div>}

        {/*Logged in, but not a shelter*/}
        {status === "NotShelter" &&
            <div className="error">
                <div className="error-icon-container">
                    <PiWarningOctagonFill className="error-icon"/>
                </div> <h4> You have to be a shelter to upload animals. </h4>
                <div className="buttons">
                    <StandardButton onclick={navigateToSignUp} size="medium" text="Create a shelter account"/>
                    <StandardButton onclick={navigateToSignIn} size="medium" text="Log in to shelter account"/>
                </div>
            </div>}

        {/*Logged in AND a shelter*/}
        {status === "Authorized" &&
            <div className="container-column">
            <h3>Add Animal:</h3>
            <form onSubmit={addAnimal}>
                <div className="input-container">
                    <div className="required-fields">
                        <label htmlFor="name"><p>Name or id:</p>
                            <input type="text" id="name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </label>
                        {!name && <p><em>required field</em></p>}
                        {name && <p><em></em></p>}

                        <div className="radio-container">
                            <input type="radio" id="mammals" value="Mammals" checked={category === "Mammals"}
                                   className="mammals"
                                   onChange={() => setCategory("Mammals")}/>
                            <label htmlFor="mammals">
                                <div className="status">
                                    {(category === "Mammals") &&
                                        <div className="on"><p>Mammal</p> <GiRat className="radio-symbol"/></div>}
                                    {!(category === "Mammals") &&
                                        <div className="off"><p>Mammal</p> <GiRat className="radio-symbol"/></div>}
                                </div>
                            </label>
                            <input type="radio" id="reptiles" value="Reptiles" checked={category === "Reptiles"}
                                   className="reptiles"
                                   onChange={() => setCategory("Reptiles")}/>
                            <label htmlFor="reptiles">
                                <div className="status">
                                    {(category === "Reptiles") &&
                                        <div className="on"><p>Reptile</p> <GiSandSnake className="radio-symbol"/>
                                        </div>}
                                    {!(category === "Reptiles") &&
                                        <div className="off"><p>Reptile</p> <GiSandSnake className="radio-symbol"/>
                                        </div>}
                                </div>
                            </label>
                            <input type="radio" id="birds" value="Birds" checked={category === "Birds"}
                                   className="birds"
                                   onChange={() => setCategory("Birds")}/>
                            <label htmlFor="birds">
                                <div className="status">
                                    {(category === "Birds") &&
                                        <div className="on"><p>Bird</p> <GiDove className="radio-symbol"/></div>}
                                    {!(category === "Birds") &&
                                        <div className="off"><p>Bird</p> <GiDove className="radio-symbol"/></div>}
                                </div>
                            </label>
                            <input type="radio" id="invertebrates" value="Invertabrates"
                                   checked={category === "Invertebrates"}
                                   className="invertebrates"
                                   onChange={() => setCategory("Invertebrates")}/>
                            <label htmlFor="invertebrates">
                                <div className="status">
                                    {(category === "Invertebrates") &&
                                        <div className="on"><p>Invertebrate</p> <GiScarabBeetle
                                            className="radio-symbol"/>
                                        </div>}
                                    {!(category === "Invertebrates") &&
                                        <div className="off"><p>Invertebrate</p> <GiScarabBeetle
                                            className="radio-symbol"/>
                                        </div>}
                                </div>
                            </label>
                            <input type="radio" id="fish" value="Fish"
                                   checked={category === "Fish"}
                                   className="fish"
                                   onChange={() => setCategory("Fish")}/>
                            <label htmlFor="fish">
                                <div className="status">
                                    {(category === "Fish") &&
                                        <div className="on"><p>Fish</p> <GiTropicalFish className="radio-symbol"/>
                                        </div>}
                                    {!(category === "Fish") &&
                                        <div className="off"><p>Fish</p> <GiTropicalFish className="radio-symbol"/>
                                        </div>}
                                </div>
                            </label>
                        </div>
                        {!category && <p><em>required field</em></p>}

                        <label htmlFor="species">Choose a species:</label>
                        <select name="species" id="species" onChange={handleSpecies}>
                            <option>
                                --- Select a species ---
                            </option>

                            {category === "Reptiles" && <>
                            <optgroup label="Snakes">
                                <option value=" Red-tailed boa" id="Boa Constrictor">
                                    Red-tailed boa (Boa Constrictor)
                                </option>
                                <option value="Royal Python" id="Python Regius">
                                    Royal Python (Python Regius)
                                </option>
                                <option value="Corn Snake" id="Pantherophis guttatus">
                                    Royal Python (Python Regius)
                                </option>
                                <option value="Other Snakes" id="Other Snakes">
                                    Other snakes
                                </option>
                            </optgroup>
                            <optgroup label="Lizards">
                                <option value="Bearded Dragon" id="Pogona vitticeps">
                                    Bearded Dragon (Pogona vitticeps)
                                </option>
                                <option value="Leopard Gecko" id="Eublepharis macularius">
                                    Leopard Gecko (Eublepharis macularius)
                                </option>
                                <option value="Crested Gecko" id="Correlophus ciliatus">
                                    Crested Gecko
                                </option>
                                <option value="Blue Tongue Skink" id="Tiliqua scincoides">
                                    Blue Tongue Skink
                                </option>
                                <option value="Other lizards" id="Other lizards">
                                    Other lizards
                                </option>
                            </optgroup>
                            <optgroup label="Turtles">
                                <option value="Russian Tortoise" id="Agrionemys Horsfieldii">
                                    Russian Tortoise (Agrionemys Horsfieldii)
                                </option>
                                <option value="Painted Turtle" id="Chrysemys Dorsalis">
                                    Painted Turtle (Chrysemys Dorsalis)
                                </option>
                                <option value="Other turtles" id="Other turtles">
                                    Other turtles
                                </option>
                            </optgroup>
                            <optgroup label="Crocodilians">
                                <option value="Dwarf Caiman" id="Paleosuchus palpebrosus">
                                    Dwarf Caiman (Paleosuchus palpebrosus)
                                </option>
                                <option value="Other crococilians" id="Other crococilians">
                                    Other crocodilians
                                </option>
                            </optgroup></>
                            }

                            {category === "Mammals" && <>
                                <optgroup label="Carnivores">
                                    <option value="Ferret" id="Mustela furo">
                                        Ferret (Mustela furo)
                                    </option>
                                    <option value="Dog" id="Canis Lupus">
                                        Dog (Canis Lupus)
                                    </option>
                                    <option value="Cat" id="Felis Cattus">
                                        Cat (Felis Cattus)
                                    </option>
                                    <option value="Other carnivores" id="Other carnivores">
                                        Other carnivores
                                    </option>
                                </optgroup>
                                <optgroup label="Rodents">
                                    <option value="Rat" id="Rattus Norvegicus">
                                        Rat (Rattus Norvegicus)
                                    </option>
                                    <option value="Mouse" id="Mus Musculus">
                                        Mouse (Mus Musculus)
                                    </option>
                                    <option value="Syrian Hamster" id="Mesocricetus auratus">
                                        Syrian Hamster (Mesocricetus auratus)
                                    </option>
                                    <option value="Cavy" id="Cavia porcellus">
                                        Guinea pig / Cavy (Cavia porcellus)
                                    </option>
                                    <option value="Other rodents" id="Other rodents">
                                        Other rodents
                                    </option>
                                </optgroup>
                                <optgroup label="Rabbits">
                                    <option value="Rabbit" id="Oryctolagus Cuniculus">
                                        Rabbit (Oryctolagus Cuniculus)
                                    </option>
                                </optgroup>
                                <optgroup label="Other">
                                    <option value = "Other Mammals" id="Other Mammals">
                                        Other Mammals
                                    </option>
                                </optgroup>
                            </>}

                            {category === "Invertebrates" && <>
                                <option value="Beetle" id="Coleoptera">
                                    Beetle (Coleoptera)
                                </option>
                                <option value="Spider" id="Arachnids">
                                    Spider or scorpion (Arachnids)
                                </option>
                                <option value="Snail or Slug" id="Gastropods">
                                    Snail or Slug (Gastropods)
                                </option>
                                <option value="Milipede" id="Diplopods">
                                    Milipede (Diplopods)
                                </option>
                                <option value="Centipede" id="Chilopods">
                                    Centipede (Chilopods)
                                </option>
                                <option value = "Other invertebrates" id="Other invertebrates">
                                    Other invertebrates
                                </option>
                            </>}

                            {category === "Birds" && <>
                                <option value="Pigeon or Dove" id="Columbids">
                                    Pigeon or Dove (Columbids)
                                </option>
                                <option value="Finch" id="Fringillids">
                                    Finch (Fringillids)
                                </option>
                                <option value="Parrot" id="Psittacines">
                                    Parrot (Psittacines)
                                </option>
                                <option value="Chicken" id="Gallus gallus">
                                    Chicken (Gallus gallus)
                                </option>
                                <option value = "Other birds" id="Other birds">
                                    Other birds
                                </option>
                                </>}

                            {category === "Fish" && <>
                                <option value="Fresh-water fish" id="Fresh-water fish">
                                    Fresh-water fish
                                </option>
                                <option value="Salt-water fish" id="Salt-water fish">
                                    Salt-water fish
                                </option>
                                </>
                            }
                        </select>
                    </div>

                    <div className="input-container">
                        <label htmlFor="image">
                            <input type="file" name="image-field" id="image" onChange={(e) => handleImageChange(e)}></input>
                        </label>
                        {previewURLPhoto && <img className="preview-avatar" src = {previewURLPhoto} alt="preview"/>}

                        <label htmlFor="age"><p>Age:</p>
                            <input type="number" id="age" value={age}
                                   onChange={(e) => setAge(e.target.valueAsNumber)}/>
                        </label>

                            <label htmlFor="Description"><p>Description:</p>
                                <textarea rows="10" cols="50" id="description" value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                                </label>

                        <label htmlFor="sex">Sex:
                        <select name="sex" id="sex" onChange={handleSex}>
                            <option value="U">
                                --- Select sex ---
                            </option>
                            <option value="M">
                                Male
                            </option>
                            <option value="F">
                                Female
                            </option>
                            <option value="X">
                                Other
                            </option>
                            <option value="U">
                                Unknown
                            </option>
                        </select>
                        </label>
                    </div>

                    <div className="container-column">
                        <div className="input-block">
                            <label htmlFor="warning">
                                <input type="checkbox" id="warning" name="warning" value="warning" checked={warning}
                                        onChange={(e) => setWarning(!warning)}/>
                                Experienced owners only</label>
                            {warning && <label htmlFor="warningtext"><p>Brief elaboration on why they are only suitable for experienced owners:</p>
                            <input type="warningtext" id="warningtext" value={warningExplanation}
                                   onChange={(e) => setWarningExplanation(e.target.value)}/>
                            </label>}
                        </div>
                    </div>
                </div>

                <button type="sumbit"> Submit </button>

                {(name === "" || commonSpeciesName === "") && <> <StandardButton disabled = {true} size="medium" text="Submit"/>
                    <p>not all required fields filled in</p>
                </>}
                {!(name === "" || commonSpeciesName === "") && <StandardButton size="medium" type="submit" value="Submit" text="Submit"/>}
            </form>
        </div>
        }
    </div>
}

export default UploadNewAnimal;