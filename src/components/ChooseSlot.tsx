// Styles
import "../styles/ChooseSlot.css"

export const ChooseSlot = (props: propsType) => {
    const {
        newMeeting
    } = props;

    const weekDay = (id: number): string => {
        switch (id) {
            case 1:
                return "Segunda";
                break;
            case 2:
                return "Terça";
                break;
            case 3:
                return "Quarta";
                break;
            case 4:
                return "Quinta";
                break;
            case 5:
                return "Sexta";
                break;
            case 6:
                return "Sábado";
                break;
            case 7:
                return "Domingo";
                break;
            default:
                return "ERRO"
        }
    }

    return (
        <div className="choose-slot">
            <div className="week-day">
                <span>
                    {
                        weekDay(newMeeting.weekDay)
                    }
                </span>
            </div>
            <div className="starting-time">
                <span>
                    Início
                    {
                        " " +
                        (newMeeting.startHour < 8 ? "0" + newMeeting.startHour : newMeeting.startHour) + ":00"
                    }
                </span>
            </div>
            <div className="ending-time">
                <span>
                    Fim
                    {
                        " " +
                        (newMeeting.endHour < 8 ? "0" + newMeeting.endHour : newMeeting.endHour) + ":00"
                    }
                </span>
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
    professors: Array<number>;
}

type propsType = {
    newMeeting: newMeetingType;
    changePage: (page: string) => void;
}