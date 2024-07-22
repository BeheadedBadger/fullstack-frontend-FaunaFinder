import {useEffect, useState} from "react";
import PetCard from "../components/PetCard";
import axios from "axios";

function Animals(){
    const [category, setCategory] = useState("");
    const [animals, setAnimals] = useState([]);

    /*Find all animals*/
    useEffect(() => {
        async function findAll(e) {
            let animalsFound = [];
            let animalstoReturn = [];

            try {
                const result = await axios.get('http://localhost:8080/animals');
                console.log(result.data);
                animalsFound = result.data;

                for(let i=0; i < animalsFound.length; i++) {
                    let dataUrl = null;
                    try {
                        const download = await axios.get( `http://localhost:8080/animals/${animalsFound[i].id}/photo`, {
                            responseType: "arraybuffer"});
                        const blob = new Blob([download.data], { type: 'image/png' });
                        dataUrl = URL.createObjectURL(blob);
                        animalsFound[i].image = dataUrl;

                        animalstoReturn.push(animalsFound[i]);
                    }
                    catch(e) {
                        console.error( e );
                    }
                    setAnimals(animalstoReturn);
                }
            } catch (e) {
                console.error(e);
            }
        }
        void findAll();
    },[]);

    return <>
        <ul>
            <div className="container-row">
                {animals && animals.map((animal) => <li key={animal.id}>
                    <PetCard name={animal.name}
                             species={animal.commonSpeciesName}
                             sex={animal.sex}
                             age={animal.age}
                             img={animal.image}
                             description={animal.description}
                             isSpecialneeds={animal.warning}
                             warnings={animal.warningExplanation}
                    />
                  </li>)}
            </div>
        </ul>
    </>
    /*
        return <>
            <div className="container-row">
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
                <PetCard name="Basil"
                         species="Ferret"
                         sex="Male"
                         age="3"
                         img="https://pbs.twimg.com/media/FfGo8JnXwAAJ0mM?format=jpg&name=4096x4096"
                         description="Loveable hyperactive dork! Nothing wrong with him really. Good with cats and dogs. A bit of a picky eater."
                         isSpecialneeds={false}
                         warnings="Needs all of your attention all of the time."
                />
                <PetCard name="Atl"
                         species="Boa Constrictor"
                         sex="Male"
                         age="16"
                         img="https://pbs.twimg.com/media/FwCIWPNXwAIZQSP?format=jpg&name=small"
                         description="Very sweet boa. A little bit shy and prefers to not be handled too much. Can be a bit scared of food due to past trauma. Has quite a few scars, but no active health problems."
                         isSpecialneeds={true}
                         warnings="BIG and can bite."
                />
            </div>
        </>*/

}

export default Animals;