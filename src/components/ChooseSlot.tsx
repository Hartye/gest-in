// Styles
import "../styles/ChooseSlot.css"

// Assets
import Cross from "../assets/cross.svg"

export const ChooseSlot = (props: propsType) => {
    const {
        handleChangeStartingCell,
        handleChangeEndingCell,
        selectedStartingCell,
        changePage,
        selectedEndingCell
    } = props;

    return (
        <div className="choose-slot">
            <div className="starting-time">
                <span>
                    {
                        selectedStartingCell
                    }
                </span>
                <img className="pointer-on-hover" src={Cross} alt="Remover" onClick={() => {
                    handleChangeEndingCell("");
                    handleChangeStartingCell("");
                    changePage("canvas");
                }} />
            </div>
            {
                selectedEndingCell !== "" &&
                <div className="ending-time">
                    <span>
                        {
                            selectedEndingCell
                        }
                    </span>
                    <img className="pointer-on-hover" src={Cross} alt="Remover" onClick={() => {
                        handleChangeEndingCell("")
                    }} />
                </div>
            }
            {
                selectedEndingCell !== "" &&
                <button className="shadow-gray click pointer-on-hover" onClick={() => {
                    changePage("manager");
                }}>Escolher</button>
            }
        </div>
    )
}

type propsType = {
    changePage: (page: string) => void;
    handleChangeStartingCell: (cell: string) => void;
    handleChangeEndingCell: (cell: string) => void;
    selectedStartingCell: string;
    selectedEndingCell: string;
}