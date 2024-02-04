// Styles
import "../../styles/DetailedCell.css"

// Assets
import Wave from "../../assets/wave.svg"

export const DetailedCell = () => {
    return (
        <div className="detailed-cell">
            <h2>Nova reunião</h2>
            <button className="pointer-on-hover click">Ver no horário</button>
            <img src={Wave} alt="Ilustração de uma onda" />
            <div className="cell-fill">
                <p>08:00</p>
                <p>09:00</p>
            </div>
        </div>
    )
}