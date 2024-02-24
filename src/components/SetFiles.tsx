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
        changePage,
        logOut,
        apiBase
    } = props;

    const apiUrlDeleteInfo = apiBase + "/delete/info";
    const apiUrlAddInfo = apiBase + "/add/info";

    const [turmaRead, setTurmaRead] = useState(false);
    const [teacherRead, setTeacherRead] = useState(false);

    const handleSetInfoOnFirebase = (teachers: Array<teachersObject>, turmas: Array<turmaType>) => {
        const url = new Request(apiUrlAddInfo);

        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                teachers: teachers,
                turma: turmas
            })
        })
            .catch((err) => console.log(err));
    }

    const handleSetData = (teachers: Array<teachersObject>, turmas: Array<turmaType>) => {
        setTeacher(teachers);
        setTurma(turmas);
        handleSetInfoOnFirebase(teachers, turmas);

        setTimeout(() => changePage("manager"), 2000);
    }

    const handleSetTempTurma = (state: boolean) => {
        setTurmaRead(state);
    }

    const handleSetTempTeacher = (state: boolean) => {
        setTeacherRead(state);
    }

    const handleLogOut = () => {
        logOut();
    }

    const handleDeleteInfoFromFirebase = () => {
        const url = new Request(apiUrlDeleteInfo);

        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        })
            .then((data) => data.json())
            .then((data) => {
                if (data) {
                    alert("Informação existente deletada com sucesso. Leia os dados dos arquivos para carregá-los novamente.");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <section className="select-files">
            <div className="notice">
                <div>
                    <p>É preciso carregar of ficheiros de turma e de professores para prosseguir para a plataforma.</p>
                    <span>Ao ler os arquivos será redirecionado para a plataforma automaticamente.</span>
                    <ReadFile
                        apiBase={apiBase}
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
                <div>
                    <div className="option-buttons">
                        <button className="pointer-on-hover click" onClick={() => {
                            handleDeleteInfoFromFirebase();
                        }}>Limpar dados existentes</button>
                        <button className="pointer-on-hover click" onClick={() => {
                            changePage("manager");
                        }}>Continuar com dados existentes</button>
                    </div>
                    <button className="shadow-gray pointer-on-hover click" onClick={() => {
                        handleLogOut();
                    }}>Cancelar</button>
                </div>
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
    logOut: () => void;
    apiBase: string;
}