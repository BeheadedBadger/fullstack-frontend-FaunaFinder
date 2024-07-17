import './Home.css';
import { GiSandSnake, GiRat, GiDove, GiScarabBeetle, GiTropicalFish, GiPawHeart } from "react-icons/gi";
import {useNavigate} from "react-router";

function Home() {

    const navigate = useNavigate();

    const navigateToAllAnimals = () => {
        navigate('/animals');
    }

    const navigateToMammals = () => {
        navigate('/animals/mammals');
    };

    const navigateToReptiles = () => {
        navigate('/animals/reptiles');
    };

    const navigateToBirds= () => {
        navigate('/animals/birds');
    };

    const navigateToInvertebrates = () => {
        navigate('/animals/invertebrates');
    };


    const navigateToFish = () => {
        navigate('/animals/fish');
    };


    return <>
        <div className="container">
            <h2>I'm looking for a...</h2>
            <div className="categories">
                {/*TODO turn these into a component*/}
                <button onClick={navigateToMammals} className="category"><GiRat className="glyphicon-animals"/>Mammal</button>
                <button onClick={navigateToReptiles} className="category"><GiSandSnake className="glyphicon-animals"/>Reptile</button>
                <button onClick={navigateToBirds} className="category"><GiDove className="glyphicon-animals"/>Bird</button>
                <button onClick={navigateToInvertebrates} className="category"><GiScarabBeetle className="glyphicon-animals"/>Invertebrate</button>
                <button onClick={navigateToFish} className="category"><GiTropicalFish className="glyphicon-animals"/>Fish</button>
            </div>
            <button onClick={navigateToAllAnimals} className="any-category"><GiPawHeart className="glyphicon-animals"/>I don't know! Show me all the animals!</button>
        </div>
    </>
}

export default Home;