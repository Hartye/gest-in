// Assets
import User from "../../assets/user.svg";

// Styles
import "../../styles/AccountButton.css";

export const AccountButton = (props: AppProps) => {
    const {
        userName
    } = props;

    return (
        <div className="account-button pointer-on-hover">
            <img src={User} alt="Usuário" />
            <span className="white-text">{userName}</span>
        </div>
    )
} 

type AppProps = {
    userName: string;
}