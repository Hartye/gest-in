// Components
import { AccountButton } from "./fragments/AccountButton"
import { ReadFile } from "./fragments/ReadFile"
import { PagesDropDown } from "./fragments/PagesDropDown"

// Styles
import "../styles/SideControllers.css"

export const SideControllers = () => {
    return (
        <section className="side-controllers">
            <AccountButton userName="Olá" />
            <ReadFile />
            <PagesDropDown />
        </section>
    )
}