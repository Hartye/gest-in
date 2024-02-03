// Styles
import "../styles/Canvas.css";

// Components
import { SlotsTable } from "./fragments/SlotsTable";

export const Canvas = () => {
    return (
        <div className="canvas">
            <SlotsTable />
        </div>
    )
}