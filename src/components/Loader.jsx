import "./Loader.css";
import {PiPawPrintFill} from "react-icons/pi";

function Loader() {
    return <div className="loader-paws">
        <PiPawPrintFill  className="paw"/>
        <PiPawPrintFill  className="paw"/>
        <PiPawPrintFill  className="paw"/>
        <PiPawPrintFill  className="paw"/>
        <PiPawPrintFill  className="paw"/>
        <PiPawPrintFill  className="paw"/>
    </div>
}

export default Loader;