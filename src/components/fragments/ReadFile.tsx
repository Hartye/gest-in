// Styles
import "../../styles/ReadFile.css";

// Assets
import ReadFileIcon from "../../assets/read_file.svg";

export const ReadFile = () => {
    return (
        <div className="read-files pointer-on-hover">
            <span className="white-text">Ler Arquivo</span>
            <img src={ReadFileIcon} alt="Ler Arquivo" />
        </div>
    )
} 