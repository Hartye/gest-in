// Styles
import "../styles/Canvas.css";

// Components
import { SlotsTable } from "./fragments/SlotsTable";

export const Canvas = (props: propsType) => {
    const {
        teachers,
        turmas,
        freeTime,
        setNewMeetingHours,
        changePage
    } = props;

    return (
        <div className="canvas">
            <SlotsTable
                teachers={teachers}
                turmas={turmas}
                freeTime={freeTime}
                setNewMeetingHours={setNewMeetingHours}
                changePage={changePage}
            />
        </div>
    )
}

type turmaType = {
    format: string;
    sigla: string;
    id: number;
}

type teacherType = "secretario" | "coordenador" | "orientador";

interface teacherMeetings {
    turmaId: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
    professors: Array<number>;
}

interface teachersObject {
    format: string;
    id: number;
    name: string;
    type: teacherType;
    meetings: Array<teacherMeetings>
}

interface busyIntervals {
    fromHour: number;
    fromMinute: number;
    toHour: number;
    toMinute: number;
}

interface busyTime {
    seg: Array<busyIntervals>;
    ter: Array<busyIntervals>;
    qua: Array<busyIntervals>;
    qui: Array<busyIntervals>;
    sex: Array<busyIntervals>;
    sab: Array<busyIntervals>;
    dom: Array<busyIntervals>;
}

interface propsType {
    teachers: Array<teachersObject>;
    turmas: Array<turmaType>;
    freeTime: busyTime;
    setNewMeetingHours: (fromHour: number, toHour: number, weekDay: number) => void;
    changePage: (page: string) => void;
}