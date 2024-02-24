// Styles
import { useState } from "react";
import "../styles/ChooseTeacher.css"

// Components
import { StylizedDropDown } from "./fragments/StylizedDropDown"
import { MultiSelectList } from "./fragments/MultiSelectList";

export const ChooseTeacher = (props: propsType) => {
    const {
        full,
        changePage,
        createNewFile,
        freeTeachers,
        addTeacher,
        removeTeacher,
        changeSecretario,
        changeOrientador,
        changeCoordenador
    } = props;

    const [secretario, setSecretario] = useState(-1);
    const [coordenador, setCoordenador] = useState(-1);
    const [orientador, setOrientador] = useState(-1);

    const chooseSecretario = (item: number) => {
        changeSecretario(item);
        addTeacher(item);
        setSecretario(item);
    }

    const chooseCoordenador = (item: number) => {
        changeCoordenador(item);
        addTeacher(item);
        setCoordenador(item);
    }

    const chooseOrientador = (item: number) => {
        changeOrientador(item);
        addTeacher(item);
        setOrientador(item);
    }

    const handleCreate = () => {
        if (
            secretario !== -1 &&
            coordenador !== -1 &&
            orientador !== -1
        ) {
            const turmaName = document.querySelector("#turma-name") as HTMLInputElement;
            createNewFile(String(turmaName.value));
        }
    }

    return (
        <div className="choose-teacher">
            {
                full &&
                <input type="text" id="turma-name" placeholder="Nome da turma" />
            }
            <StylizedDropDown
                type="secretario"
                title="Professor Secretário"
                list={freeTeachers.filter(s => s.type == "secretario")}
                chooseItem={chooseSecretario}
            />
            <StylizedDropDown
                type="coordenador"
                title="Professor Coordenador"
                list={freeTeachers.filter(s => s.type == "coordenador")}
                chooseItem={chooseCoordenador}
            />
            <StylizedDropDown
                type="orientador"
                title="Professor Orientador" list={freeTeachers.filter(s => s.type == "orientador")}
                chooseItem={chooseOrientador} 
            />
            <MultiSelectList 
                title="Professores não obrigatórios" 
                freeTeachers={freeTeachers} 
                addTeacher={addTeacher}
                removeTeacher={removeTeacher}
            />
            {
                full == true &&
                <div className="controls">
                    <button className="click pointer-on-hover shadow-gray" onClick={() => changePage("canvas")}>Cancelar</button>
                    <button className="click pointer-on-hover shadow-gray" onClick={() => handleCreate()}>Finalizar</button>
                </div>
            }
        </div>
    )
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
    full: boolean;
    changePage: (page: string) => void;
    createNewFile: (turmaName: string) => void;
    freeTeachers: Array<teachersObject>;
    addTeacher: (teacherId: number) => void;
    removeTeacher: (teacherId: number) => void;
    changeSecretario: (teacherId: number) => void;
    changeOrientador: (teacherId: number) => void;
    changeCoordenador: (teacherId: number) => void;
};