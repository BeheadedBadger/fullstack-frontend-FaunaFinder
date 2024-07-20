import "./StandardButton.css"

function StandardButton({size, text, onclick, type, value, icon}) {
    return ( <>
        <button className={size} onClick={onclick} value={value} type={type}> {(icon != null) &&
            <div className="button-icon">{icon}</div>} <p>{text}</p></button>
    </>)
}

export default StandardButton;