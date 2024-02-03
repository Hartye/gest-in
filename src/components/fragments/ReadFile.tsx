// Styles
import "../../styles/ReadFile.css";

// Assets
import ReadFileIcon from "../../assets/read_file.svg";

export const ReadFile = (props: propsType) => {
    const {
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

                    const parsedToObject: Array<infoType> = JSON.parse(jsonString);

                    changeInfo(parsedToObject);
                }
                catch (err) {
                    console.log(err);
                }
            }

            reader.readAsText(file);
        }
    }

    return (
        <label className="white-text pointer-on-hover read-files">
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
    type: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
}

interface propsType {
    changeInfo: (data: Array<infoType>) => void;
}