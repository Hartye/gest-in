// Components
import { AccountButton } from "./fragments/AccountButton"

// Styles
import "../styles/SideControllers.css"

export const SimpleSideControllers = () => {

    return (
        <section className="side-controllers">
            <AccountButton userName="Olá" />
        </section>
    )
}