// Styles
import "../styles/Canvas.css";

// Components
import { SimpleSlotsTable } from "./fragments/SimpleSlotsTable";

export const TeacherCanvas = (props: propsType) => {
    const {
        teachers,
        turmas,
    } = props;

    return (
        <div className="canvas">
            <SimpleSlotsTable
                teachers={teachers}
                turmas={turmas}
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

interface propsType {
    teachers: Array<teachersObject>;
    turmas: Array<turmaType>;
}