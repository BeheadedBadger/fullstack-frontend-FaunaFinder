import "./StandardButton.css"

function StandardButton({size, text, onclick, type, value, icon}) {
    return ( <>
        {!(onclick === null) && <button className={size} onClick={onclick} value={value} type={type}> {icon} <p>{text}</p></button>}
        {(onclick === null) && <button className={size} value={value} type={type}> {icon} <p>{text}</p></button>}
    </>)
}

export default StandardButton;