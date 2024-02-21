// Styles
import "../styles/SetFiles.css"

// Components
import { ReadFile } from "./fragments/ReadFile"

// Assets
import Right from "../assets/Right.webp"
import { useState } from "react";

export const SetFiles = (props: propsType) => {
    const {
        setTeacher,
        setTurma,
        changePage
    } = props;
    
    const [turmaRead, setTurmaRead] = useState(false);
    const [teacherRead, setTeacherRead] = useState(false);

    const handleSetData = (teachers: Array<teachersObject>, turmas: Array<turmaType>) => {
        setTeacher(teachers);
        setTurma(turmas);
        setTimeout(() => changePage("manager"), 2000);
    }

    const handleSetTempTurma = (state: boolean) => {
        setTurmaRead(state);
    }

    const handleSetTempTeacher = (state: boolean) => {
        setTeacherRead(state);
    }

    return (
        <section className="select-files" >
            <div className="notice">
                <div>
                    <p>É preciso carregar of ficheiros de turma e de professores para prosseguir para a plataforma.</p>
                    <span>Ao ler os arquivos será redirecionado para a plataforma automaticamente.</span>
                    <ReadFile 
                        setTurmaState={handleSetTempTurma} 
                        setTeacherState={handleSetTempTeacher} 
                        changeInfo={handleSetData} />
                    <div className={turmaRead === true ? "appear" : ""}>
                        <img src={Right} alt="Aprovado" />
                        <p>Turmas</p>
                    </div>
                    <div className={teacherRead === true ? "appear" : ""}>
                        <img src={Right} alt="Aprovado" />
                        <p>Professores</p>
                    </div>
                </div>
                <button className="shadow-gray pointer-on-hover click" onClick={() => {
                    history.back();
                }}>Cancelar</button>
            </div>
        </section>
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
    orientador: number;
    coordenador: number;
    secretario: number;
    professors: Array<number>;
}

interface teachersObject {
    format: string;
    id: number;
    name: string;
    type: teacherType;
    meetings: Array<teacherMeetings>
}

type propsType = {
    setTurma: (data: Array<turmaType>) => void;
    setTeacher: (data: Array<teachersObject>) => void;
    changePage: (page: string) => void;
}