// Styles
import "../../styles/PagesDropDown.css";

// Assets
import CaretDownIcon from "../../assets/caret_down.svg";

export const PagesDropDown = () => {
    return (
        <nav className='combobox choose-page pointer-on-hover'>
        <span className='combobox-title' onClick={() => {
            document.querySelector(".combobox-body.lorem")?.classList.toggle("open");
            document.querySelector(".combobox-icon.lorem")?.classList.toggle("tilt");
        }}>
        <img className='combobox-icon lorem' src={CaretDownIcon} alt="Open" />
        Páginas
        </span>
        <div className='combobox-body lorem'>
            <li className='click'>Lorem</li>
            <li className='click'>Ipsum</li>
            <li className='click'>Dolor</li>
            <li className='click'>Sit</li>
            <li className='click'>Amet</li>
        </div>
    </nav>
    )
}