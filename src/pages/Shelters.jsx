import axios from "axios";
import {useEffect, useState} from "react";
import ShelterInfoCard from "../components/ShelterInfoCard.jsx";

function Shelters(){

    const [shelters, setShelters] = useState([]);

    {/*Find all users labeled as shelter*/}
    useEffect(() => {
        async function findAll(e) {
            let usersFound = [];
            let sheltersFound = [];

        try {
            const result = await axios.get('http://localhost:8080/users');
            console.log(result.data);
            usersFound = result.data;

            for(let i=0; i < usersFound.length; i++) {
                if (usersFound[i].role === "SHELTER") {
                    sheltersFound.push(usersFound[i]);
                }
            }

            setShelters(sheltersFound);
            console.log(sheltersFound);
            } catch (e) {
            console.error(e);
        }
    }

        void findAll();
    }, [])

    return <div className="container-column">
        <ul>
            <div className="container-row">
                {shelters.map((shelter) => <li key={shelter.username}>
                    <ShelterInfoCard name={shelter.username} speciality={shelter.speciality}/>
                </li>)}
            </div>
        </ul>
        {/*Make a little info card for shelter*/}
    </div>
}

export default Shelters;