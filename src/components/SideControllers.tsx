// Components
import { AccountButton } from "./fragments/AccountButton"
import { PagesDropDown } from "./fragments/PagesDropDown"

// Styles
import "../styles/SideControllers.css"
import { ChooseSlot } from "./ChooseSlot"

export const SideControllers = (props: propsType) => {
    const {
        newMeeting,
        changePage
    } = props;

    return (
        <section className="side-controllers">
            <AccountButton userName="Olá" />
            <PagesDropDown changePage={changePage} />
            <ChooseSlot
                newMeeting={newMeeting}
                changePage={changePage}
            />
        </section>
    )
}

type newMeetingType = {
    format: string;
    turmaId: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
    professors: Array<number>;
}

type propsType = {
    newMeeting: newMeetingType;
    changePage: (page: string) => void;
}