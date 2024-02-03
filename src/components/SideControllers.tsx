// Components
import { AccountButton } from "./fragments/AccountButton"
import { ReadFile } from "./fragments/ReadFile"
import { PagesDropDown } from "./fragments/PagesDropDown"

// Styles
import "../styles/SideControllers.css"

export const SideControllers = (props: propsType) => {
    const {
        changeInfo
    } = props;

    return (
        <section className="side-controllers">
            <AccountButton userName="Olá" />
            <ReadFile changeInfo={changeInfo} />
            <PagesDropDown />
        </section>
    )
}

interface propsType {
    changeInfo: ( data: Array<infoType>) => void;
}

type infoType = {
    type: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
}