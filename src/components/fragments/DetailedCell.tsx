// Styles
import "../../styles/DetailedCell.css"

export const DetailedCell = (props: propsType) => {
    const {
        startTime,
        endTime
    } = props;

    return (
        <div className="detailed-cell">
            <h2>Nova reunião</h2>
            <div className="cell-fill">
                <p>{startTime}</p>
                <p>{endTime}</p>
            </div>
        </div>
    )
}

type propsType = {
    startTime: string;
    endTime: string;
}