import {GiDove, GiPawHeart, GiRat, GiSandSnake, GiScarabBeetle} from "react-icons/gi";
import "./ShelterInfoCard.css"
import {FiDollarSign} from "react-icons/fi";
import StandardButton from "./StandardButton.jsx";
import {IoIosPaw} from "react-icons/io";
import {FaQuestion} from "react-icons/fa";
import {BsPatchQuestionFill} from "react-icons/bs";

function ShelterInfoCard({speciality, name, profilepic}) {
    return <> <div className="shelter-card">
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
            {!(speciality) && <GiPawHeart classname="speciality-icon"/>}
        </div>
    </div>

    <div className="actions">
        <StandardButton size="small" icon={<FiDollarSign/>} text="donate"/>
        <StandardButton size="small" icon={<IoIosPaw/>} text="animals"/>
    </div>
</>
}

export default ShelterInfoCard;