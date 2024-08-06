import {GiDove, GiPawHeart, GiRat, GiSandSnake, GiScarabBeetle} from "react-icons/gi";
import "./ShelterInfoCard.css"
import {FiDollarSign} from "react-icons/fi";
import StandardButton from "./StandardButton.jsx";
import {IoIosPaw} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {BiSolidDonateHeart} from "react-icons/bi";

function ShelterInfoCard({speciality, name, profilepic}) {
    let navigate= useNavigate();

    const navigateToDonate = () => {
        navigate(`/donate/${name}`);
    }

    return <> <div className="shelter-card" onClick={() => navigate(`/shelters/details/${name}`)}>
        <div className="title"><h4>{name}</h4>
            <hr/>
            <p>speciality: {speciality}</p>
        </div>
        <div className="speciality-icon-container">
            {(speciality === "Mammals") && <GiRat className="speciality-icon"/>}
            {(speciality === "Reptiles") && <GiSandSnake className="speciality-icon"/>}
            {(speciality === "Birds") && <GiDove className="speciality-icon"/>}
            {(speciality === "Fish") && <GiSandSnake className="speciality-icon"/>}
            {(speciality === "Invertebrates") && <GiScarabBeetle className="speciality-icon"/>}
            {!(speciality) && <GiPawHeart className="speciality-icon"/>}
        </div>
    </div>

    <div className="actions">
        <StandardButton size="small" icon={<BiSolidDonateHeart/>} text="donate" onclick={navigateToDonate}/>
        <StandardButton size="small" icon={<IoIosPaw/>} text="animals"/>
    </div>
</>
}

export default ShelterInfoCard;