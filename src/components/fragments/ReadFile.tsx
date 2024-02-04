// Styles
import "../../styles/ReadFile.css";

// Assets
import ReadFileIcon from "../../assets/read_file.svg";

export const ReadFile = (props: propsType) => {
    const {
        handleSetTeachers,
        changeInfo
    } = props;

    const loadNewFile = () => {
        const fileInput = document.querySelector("#file-input") as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (el) => {
                try {
                    const jsonString: string = el.target?.result as string;

                    const parsedToObject: Array<infoType> | Array<teachersObject> = JSON.parse(jsonString);

                    if (parsedToObject[0].format == "horario") {
                        const infoTypeData: Array<infoType> = parsedToObject as Array<infoType>;
                        changeInfo(infoTypeData);
                        console.log("Horário");
                        console.log(parsedToObject);
                    }
                    else if (parsedToObject[0].format == "professor") {
                        const teacherTypeData: Array<teachersObject> = parsedToObject as Array<teachersObject>;
                        handleSetTeachers(teacherTypeData);
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

type infoType = {
    format: string;
    type: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
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

interface propsType {
    handleSetTeachers: (data: Array<teachersObject>) => void;
    changeInfo: (data: Array<infoType>) => void;
}