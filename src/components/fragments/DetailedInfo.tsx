// Styles
import "../../styles/DetailedInfo.css"

export const DetailedInfo = (props: propsType) => {
    const {
        info,
        teachers,
        close
    } = props;

    return (
        <section className="detailed-info">
            <div className="modal">
                {
                    info.map(meeting =>
                        <div>
                            <h1>{meeting.turma}</h1>
                            <p>Secretário - {teachers.find(s => s.id == meeting.secretario)?.name}</p>
                            <p>Coordenador - {teachers.find(s => s.id == meeting.coordenador)?.name}</p>
                            <p>Orientador - {teachers.find(s => s.id == meeting.orientador)?.name}</p>
                            <div className="teachers">
                                <p>Professores não obrigatórios</p>
                                {
                                    meeting.teachers.map(prof => <span>{teachers.find(s => s.id == prof)?.name}</span>)
                                }
                            </div>
                        </div>)
                }
                <button className="pointer-on-hover shadow-gray click" onClick={() => close()}>Fechar</button>
            </div>
        </section>
    )
}

interface selectedCell {
    turmaId: number;
    turma: string;
    teachers: Array<number>;
    secretario: number;
    orientador: number;
    coordenador: number;
    weekDay: number;
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
    meetings: Array<teacherMeetings>;
}

type propsType = {
    info: Array<selectedCell>;
    teachers: Array<teachersObject>;
    close: () => void;
}