// Styles
import { useState } from "react";
import "../styles/ChooseTeacher.css"

// Components
import { StylizedDropDown } from "./fragments/StylizedDropDown"

export const ChooseTeacher = (props: propsType) => {
    const {
        changePage,
        createNewFile,
        teachers
    } = props;

    const [secretario, setSecretario] = useState(-1);
    const [coordenador, setCoordenador] = useState(-1);
    const [orientador, setOrientador] = useState(-1);

    const chooseSecretario = (item: number) => {
        setSecretario(item);
    }

    const chooseCoordenador = (item: number) => {
        setCoordenador(item);
    }

    const chooseOrientador = (item: number) => {
        setOrientador(item);
    }

    const handleCreate = () => {
        if (
            secretario !== -1 &&
            coordenador !== -1 &&
            orientador !== -1
        ) {
            createNewFile({
                secretario,
                coordenador,
                orientador
            });
        }
        else {
            alert("Escolha todos os professores para prosseguir")
        }
    }

    return (
        <div className="choose-teacher">
            {
                teachers.filter(s => s.type == "orientador").length > 0 &&
                <StylizedDropDown
                    type="secretario"
                    title="Professor Secretário"
                    list={teachers.filter(s => s.type == "secretario")}
                    chooseItem={chooseSecretario}
                />
            }
            {
                teachers.filter(s => s.type == "orientador").length > 0 &&
                <StylizedDropDown
                    type="coordenador"
                    title="Professor Coordenador"
                    list={teachers.filter(s => s.type == "coordenador")}
                    chooseItem={chooseCoordenador}
                />
            }
            {
                teachers.filter(s => s.type == "orientador").length > 0 &&
                <StylizedDropDown
                    type="orientador"
                    title="Professor Orientador" list={teachers.filter(s => s.type == "orientador")} chooseItem={chooseOrientador} />
            }
            {
                teachers.length > 0 &&
                <div className="controls">
                    <button className="click pointer-on-hover" onClick={() => changePage("canvas")}>Cancelar</button>
                    <button className="click pointer-on-hover" onClick={() => handleCreate()}>Finalizar</button>
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

interface choosenTeachers {
    secretario: number;
    coordenador: number;
    orientador: number;
}

type propsType = {
    changePage: (page: string) => void;
    createNewFile: (data: choosenTeachers) => void;
    teachers: Array<teachersObject>;
};