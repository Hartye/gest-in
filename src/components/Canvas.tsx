// Styles
import "../styles/Canvas.css";

// Components
import { SlotsTable } from "./fragments/SlotsTable";

export const Canvas = (props: propsType) => {
    const {
        info
    } = props;

    return (
        <div className="canvas">
            <SlotsTable slots={info} />
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
    info: Array<infoType>;
}