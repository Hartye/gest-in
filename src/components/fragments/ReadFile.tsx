// Styles
import "../../styles/ReadFile.css";

// Assets
import ReadFileIcon from "../../assets/read_file.svg";
import { useEffect, useState } from "react";

export const ReadFile = (props: propsType) => {
    const {
        changeInfo,
        setTurmaState,
        setTeacherState
    } = props;

    const [tempTurma, setTempTurma] = useState(Array<turmaType>);
    const [turmaRead, setTurmaRead] = useState(false);
    const [tempTeacher, setTempTeacher] = useState(Array<teachersObject>);
    const [teacherRead, setTeacherRead] = useState(false);

    const uploadData = (teachers: Array<teachersObject>, turmas: Array<turmaType>) => {
        changeInfo(teachers, turmas);
    }

    useEffect(() => {
        if (turmaRead && teacherRead) {
            uploadData(tempTeacher, tempTurma);
        }
    }, [turmaRead, teacherRead, tempTeacher, tempTurma])

    const loadNewFile = () => {
        const fileInput = document.querySelector("#file-input") as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (el) => {
                try {
                    const jsonString: string = el.target?.result as string;

                    const parsedToObject: Array<turmaType> | Array<teachersObject> = JSON.parse(jsonString);

                    if (parsedToObject[0].format == "turma") {
                        const infoTypeData: Array<turmaType> = parsedToObject as Array<turmaType>;
                        setTempTurma(infoTypeData);
                        setTurmaRead(true);
                        setTurmaState(true);
                        console.log("Horário");
                        console.log(parsedToObject);
                    }
                    else if (parsedToObject[0].format == "professor") {
                        const teacherTypeData: Array<teachersObject> = parsedToObject as Array<teachersObject>;
                        setTempTeacher(teacherTypeData);
                        setTeacherRead(true);
                        setTeacherState(true);
                        console.log("Professores");
                        console.log(parsedToObject);
                    }
                    else {
                        const text = "Erro não foi possível ler o arquivo";
                        console.log(text)
                        alert(text);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }

            reader.readAsText(file);
        }
    }

    return (
        <label className="white-text pointer-on-hover read-files click shadow-gray">
            <p>Ler Arquivo</p>
            <input onChange={
                () => {
                    loadNewFile();
                }
            } accept=".json" type="file" name="file-input" id="file-input" />
            <img src={ReadFileIcon} alt="Ler Arquivo" />
        </label>
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
    changeInfo: (teachers: Array<teachersObject>, turmas: Array<turmaType>) => void;
    setTurmaState: (state: boolean) => void;
    setTeacherState: (state: boolean) => void;
}