// Assets
import User from "../../assets/user.svg";

// Styles
import "../../styles/AccountButton.css";

export const AccountButton = (props: AppProps) => {
    const {
        userName,
        logOut
    } = props;

    return (
        <div className="account-button pointer-on-hover" onClick={() => logOut()}>
            <img src={User} alt="Usuário" className="pointer-on-hover" />
            <span className="white-text pointer-on-hover">{userName}</span>
        </div>
    )
} 

type AppProps = {
    userName: string;
    logOut: () => void;
}