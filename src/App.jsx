import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import PetCard from "./components/PetCard.jsx";

function App() {
    return (
        <div className="page-container">
            <div className="header">
                <Header/>
            </div>
            <div className="content">
                Testing a little someting someting
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
        </div>
    )
}

export default App;
