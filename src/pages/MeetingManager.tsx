// Styles
import "../styles/MeetingManager.css"

// Components
import { ChooseTeacher } from "../components/ChooseTeacher"
import { DetailedCell } from "../components/fragments/DetailedCell"

export const MeetingManager = (props: propsType) => {
    const {
        changePage,
        teachers
    } = props;

    const createNewFile = (data: choosenTeachers) => {
        const teachersList = [
            teachers.filter(s => s.id == data.secretario)[0],
            teachers.filter(s => s.id == data.coordenador)[0],
            teachers.filter(s => s.id == data.orientador)[0]
        ]

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(teachersList)));
        element.setAttribute('download', "professores.json");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return (
        <section className="manager">
            <DetailedCell />
            <ChooseTeacher changePage={changePage} teachers={teachers} createNewFile={createNewFile} />
        </section>
    )
}

interface choosenTeachers {
    secretario: number;
    coordenador: number;
    orientador: number;
}

type teacherType = "secretario" | "coordenador" | "orientador";

interface teacherMeetings {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
}

interface teachersObject {
    format: string;
    id: number;
    name: string;
    type: teacherType;
    meetings: Array<teacherMeetings>
}

type propsType = {
    changePage: (page: string) => void;
    teachers: Array<teachersObject>;
}