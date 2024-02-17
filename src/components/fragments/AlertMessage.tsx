// Styles
import "../../styles/AlertMessage.css"

export const AlertMessage = (props: propsType) => {
    const {
        text,
        alertState
    } = props;

    return (
        <div className="alert">
            <div className="body">
                <span>{text}</span>
                <div>
                    <button className="click shadow-gray pointer-on-hover" onClick={() => alertState(false)}>OK</button>
                </div>
            </div>
        </div>
    )
}

type propsType = {
    text: string;
    alertState: (state: boolean) => void;
}