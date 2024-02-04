// Styles
import "../styles/Canvas.css";

// Components
import { SlotsTable } from "../components/fragments/SlotsTable";

export const Canvas = (props: propsType) => {
    const {
        selectedStartingCell,
        handleChangeEndingCell,
        handleChangeStartingCell,
        info
    } = props;

    return (
        <div className="canvas">
            <SlotsTable
                slots={info} 
                selectedStartingCell={selectedStartingCell}
                handleChangeEndingCell={handleChangeEndingCell}
                handleChangeStartingCell={handleChangeStartingCell}
            />
        </div>
    )
}

type infoType = {
    type: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
}

interface propsType {
    selectedStartingCell: string;
    handleChangeEndingCell: (cell: string) => void;
    handleChangeStartingCell: (cell: string) => void;
    info: Array<infoType>;
}