// Styles
import { useState } from "react";
import "../styles/ChooseTeacher.css"

// Components
import { StylizedDropDown } from "./fragments/StylizedDropDown"

export const ChooseTeacher = (props: propsType) => {
    const {
        changePage,
        createNewFile,
        teachers,
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
    }

    return (
        <div className="choose-teacher">
            <StylizedDropDown
                type="secretario"
                title="Professor Secretário"
                list={teachers.filter(s => s.type == "secretario")}
                chooseItem={chooseSecretario}
            />
            <StylizedDropDown
                type="coordenador"
                title="Professor Coordenador"
                list={teachers.filter(s => s.type == "coordenador")}
                chooseItem={chooseCoordenador}
            />
            <StylizedDropDown
                type="orientador"
                title="Professor Orientador" list={teachers.filter(s => s.type == "orientador")}
                chooseItem={chooseOrientador} />
            <div className="controls">
                <button className="click pointer-on-hover shadow-gray" onClick={() => changePage("canvas")}>Cancelar</button>
                <button className="click pointer-on-hover shadow-gray" onClick={() => handleCreate()}>Finalizar</button>
            </div>
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