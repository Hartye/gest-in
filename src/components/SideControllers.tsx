// Components
import { AccountButton } from "./fragments/AccountButton"
import { ReadFile } from "./fragments/ReadFile"
import { PagesDropDown } from "./fragments/PagesDropDown"

// Styles
import "../styles/SideControllers.css"
import { ChooseSlot } from "./ChooseSlot"

export const SideControllers = (props: propsType) => {
    const {
        handleChangeEndingCell,
        handleChangeStartingCell,
        selectedStartingCell,
        selectedEndingCell,
        changeInfo,
        handleSetTeachers,
        changePage
    } = props;

    return (
        <section className="side-controllers">
            <AccountButton userName="Olá" />
            <ReadFile handleSetTeachers={handleSetTeachers} changeInfo={changeInfo} />
            <PagesDropDown changePage={changePage} />
            {
                selectedStartingCell !== "" &&
                <ChooseSlot 
                    handleChangeEndingCell={handleChangeEndingCell}
                    handleChangeStartingCell={handleChangeStartingCell}
                    selectedStartingCell={selectedStartingCell} 
                    selectedEndingCell={selectedEndingCell} 
                    changePage={changePage}
                />
            }
        </section>
    )
}

type teacherType = "secretario" | "coordenador" | "orientador";

interface teacherMeetings {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
}

interface teachersObject {
    format: string;
    id: number;
    name: string;
    type: teacherType;
    meetings: Array<teacherMeetings>
}

interface propsType {
    selectedStartingCell: string;
    selectedEndingCell: string;
    handleChangeEndingCell: (cell: string) => void;
    handleChangeStartingCell: (cell: string) => void;
    changeInfo: ( data: Array<infoType>) => void;
    changePage: ( page: string ) => void;
    handleSetTeachers: (data: Array<teachersObject>) => void;
}

type infoType = {
    type: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
}