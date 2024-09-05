import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';


export const AnimalContext = createContext( {} );

function AnimalContextProvider( {children} ) {
    const [animalData, setAnimalData] = useState({
        animals: [],
        status: 'pending',
    })

    useEffect(() => {
        if (animalData.animals.length === 0) {
            void fetchAnimalData();
        }
    }, []);

    async function fetchAnimalData() {
        let animalsFound = [];

        try {
            const result = await axios.get('http://localhost:8080/animals');

            for (let i = 0; i < result.data.length; i++) {
                let tempAnimal = result.data[i];

                if (tempAnimal.animalPhoto !== null) {
                    try {
                        const download = await axios.get(`http://localhost:8080/animals/${tempAnimal.id}/photo`, {
                            headers: {},
                            responseType: "arraybuffer"
                        });
                        const blob = new Blob([download.data], {type: 'image/png'});
                        tempAnimal.animalPhoto = URL.createObjectURL(blob);
                    } catch (e) {

                    }
                }
                animalsFound.push(tempAnimal);
            }
            setAnimalData({
                animals: animalsFound,
                status: "done"
            });
        } catch (e) {

        }
    }

    const contextData = {
        animalData: animalData
    };

    return (
        <AnimalContext.Provider value={contextData}>
            {(animalData.status === 'done') && children}
            {(animalData.status === 'pending') && <p>Loading...</p>}
        </AnimalContext.Provider>
    );
}

export default AnimalContextProvider;