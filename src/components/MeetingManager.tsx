// Styles
import "../styles/MeetingManager.css"

// Components
import { ChooseTeacher } from "./ChooseTeacher"
import { DetailedCell } from "./fragments/DetailedCell"

export const MeetingManager = (props: propsType) => {
    const {
        changePage,
        turmas,
        teachers,
        freeTeachers,
        setNewMeeting,
        setFreeTime,
        newMeeting,
        apiUrlNewMeeting,
        apiUrlMerge,
        addTeacher,
        removeTeacher,
        changeSecretario,
        changeOrientador,
        changeCoordenador
    } = props;

    const loadNewMeeting = () => {
        if (newMeeting.endHour !== 0 && newMeeting.startHour !== 0) {
            return;
        }

        const url = new Request(apiUrlNewMeeting);

        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(teachers)
        })
            .then((data) => data.json())
            .then((data) => {
                setNewMeeting(data.newMeeting);
                setFreeTime(data.freeTimeTable);

                console.log(data.newMeeting);
                console.log(data.freeTimeTable);
            })
            .catch((err) => console.log(err));
    }

    const createNewFile = (turmaName: string) => {

        let newDataTurmas = {};
        let newDataProfessores = {};

        const newMeetingWithSigla = newMeeting;
        newMeetingWithSigla.sigla = turmaName;

        const url = new Request(apiUrlMerge);

        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                turmas: turmas,
                professores: teachers,
                meeting: newMeetingWithSigla
            })
        })
            .then((data) => data.json())
            .then((data) => {
                newDataTurmas = data.turmas;
                newDataProfessores = data.professores;

                downloadFile(newDataTurmas, "Turma");
                downloadFile(newDataProfessores, "Professores");

                console.log(data.turmas);
                console.log(data.professores);

                
                changePage("read");
            })
            .catch((err) => {
                console.log(err);
                changePage("read");
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const downloadFile = (file: any, name: string) => {
        const el = document.createElement('a');
        el.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(file)));
        el.setAttribute('download', `${name}.json`);
        el.style.display = 'none';
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    }

    return (
        <section className="manager" onLoad={() => loadNewMeeting()}>
            <DetailedCell
                newMeeting={newMeeting}
                changePage={changePage}
            />
            <ChooseTeacher 
                changePage={changePage} 
                freeTeachers={freeTeachers}
                createNewFile={createNewFile} 
                addTeacher={addTeacher} 
                removeTeacher={removeTeacher} 
                changeSecretario={changeSecretario}
                changeOrientador={changeOrientador}
                changeCoordenador={changeCoordenador}
            />
        </section>
    )
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

type turmaType = {
    format: string;
    sigla: string;
    id: number;
}

type newMeetingType = {
    format: string;
    turmaId: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    sigla: string;
    weekDay: number;
    orientador: number;
    coordenador: number;
    secretario: number;
    professors: Array<number>;
}

type propsType = {
    changePage: (page: string) => void;
    turmas: Array<turmaType>;
    teachers: Array<teachersObject>;
    freeTeachers: Array<teachersObject>;
    setNewMeeting: (meeting: newMeetingType) => void;
    setFreeTime: (time: busyTime) => void;
    newMeeting: newMeetingType;
    apiUrlNewMeeting: string;
    apiUrlMerge: string;
    addTeacher: (teacherId: number) => void;
    removeTeacher: (teacherId: number) => void;
    changeSecretario: (teacherId: number) => void;
    changeOrientador: (teacherId: number) => void;
    changeCoordenador: (teacherId: number) => void;
}