// Styles
import "../../styles/DetailedCell.css"

export const DetailedCell = (props: propsType) => {
    const {
        newMeeting,
        changePage
    } = props;

    return (
        <div className="detailed-cell">
            <h2>Nova reunião</h2>
            <button className="pointer-on-hover shadow-gray click" onClick={() => {
                changePage("canvas");
            }}>Escolher outra hora</button>
            <div className="cell-fill">
                <p>{
                newMeeting !== undefined ?
                newMeeting.startHour < 10 ? "0" + newMeeting.startHour + ":00": newMeeting.startHour + ":00"
                : "Loading"
                }</p>
                <p>{newMeeting !== undefined ?
                newMeeting.endHour < 10 ? "0" + newMeeting.endHour + ":00" : newMeeting.endHour + ":00"
                : "Loading"
                }</p>
            </div>
        </div>
    )
}

type newMeetingType = {
    format: string;
    turmaId: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
    orientador: number;
    coordenador: number;
    secretario: number;
    sigla: string;
    professors: Array<number>;
}

type propsType = {
    newMeeting: newMeetingType;
    changePage: (page: string) => void;
}