import './Header.css'
import image from "../assets/FaunaFinderLogo.png"

function Header() {
    return (
        <div className="header">
            <img src = {image} alt="logo"/>
        </div>
    )
}

export default Header;