// Styles
import "../../styles/PagesDropDown.css";

// Assets
import CaretDownIcon from "../../assets/caret_down.svg";

export const PagesDropDown = () => {
    return (
        <div className="choose-page pointer-on-hover">
            <span className="white-text">Páginas</span>
            <img src={CaretDownIcon} alt="Páginas" />
        </div>
    )
}