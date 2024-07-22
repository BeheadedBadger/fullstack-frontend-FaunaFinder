import "./StandardButton.css"

function StandardButton({disabled, size, text, onclick, type, value, icon}) {
    return (<>
        <button className={size} disabled={disabled} onClick={onclick} value={value} type={type}> {(icon != null) &&
            <div className="button-icon">{icon}</div>} <p>{text}</p></button>
    </>)
}

export default StandardButton;