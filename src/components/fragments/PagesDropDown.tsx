// Styles
import "../../styles/PagesDropDown.css";

// Assets
import CaretDownIcon from "../../assets/caret_down.svg";

export const PagesDropDown = (props: propsType) => {
    const {
        changePage
    } = props;

    const handleChangePage = (page: string) => {
        changePage(page);
    }

    return (
        <nav className='combobox choose-page pointer-on-hover'>
            <span className='combobox-title' onClick={() => {
                document.querySelector(".combobox-body.pages")?.classList.toggle("open");
                document.querySelector(".combobox-icon.pages")?.classList.toggle("tilt");
            }}>
                <img className='combobox-icon pages' src={CaretDownIcon} alt="Open" />
                Páginas
            </span>
            <div className='combobox-body pages'>
                <li className='click' onClick={() => handleChangePage("canvas")}>Horário</li>
            </div>
        </nav>
    )
}

type propsType = {
    changePage: (page: string) => void;
}