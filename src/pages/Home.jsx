import './Home.css';
import { GiSandSnake, GiRat, GiDove, GiScarabBeetle, GiTropicalFish, GiPawHeart } from "react-icons/gi";
import {useNavigate} from "react-router-dom";
import StandardButton from "../components/StandardButton";
import React from "react";
import Loader from "../components/Loader.jsx";

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
        <div className="container-column">
            <h2>I'm looking for a...</h2>
            <div className="categories">
                <StandardButton onclick={navigateToMammals} size="large" icon={<GiRat/>} text="Mammal"/>
                <StandardButton onclick={navigateToReptiles} size="large" icon={<GiSandSnake/>} text="Reptile"/>
                <StandardButton onclick={navigateToBirds} size="large" icon={<GiDove/>} text="Bird"/>
                <StandardButton onclick={navigateToInvertebrates} size="large" icon={<GiScarabBeetle/>} text="Invertebrate"/>
                <StandardButton onclick={navigateToFish} size="large" icon={<GiTropicalFish/>} text="Fish"/>
            </div>
            <StandardButton onclick={navigateToAllAnimals} size="medium-large" icon={<GiPawHeart/>} text="I don't know! Show me all the animals!"/>
        </div>
    </>
}

export default Home;