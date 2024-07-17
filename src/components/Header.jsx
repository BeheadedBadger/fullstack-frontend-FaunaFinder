import './Header.css'
import image from "../assets/FaunaFinderLogo.png"

function Header() {
    return (
        <div className="header">
            <img className="header-logo" src={image} alt="logo"/>
            <i className="glyphicon glyphicon-menu-hamburger"></i>
        </div>
    )
}

export default Header;