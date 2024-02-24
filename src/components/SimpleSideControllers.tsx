// Components
import { AccountButton } from "./fragments/AccountButton"

// Styles
import "../styles/SideControllers.css"

export const SimpleSideControllers = (props: propsType) => {
    const { logOut } = props;

    const handleLogOut = () => {
        logOut();
    }

    return (
        <section className="side-controllers">
            <AccountButton logOut={handleLogOut} userName="Olá" />
        </section>
    )
}

type propsType = {
    logOut: () => void;
}