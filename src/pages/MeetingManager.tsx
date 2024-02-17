// Styles
import "../styles/MeetingManager.css"

// Components
import { ChooseTeacher } from "../components/ChooseTeacher"
import { DetailedCell } from "../components/fragments/DetailedCell"

export const MeetingManager = (props: propsType) => {
    const {
        changePage,
        teachers,
        setNewMeeting,
        setFreeTime,
        newMeeting
    } = props;

    const checkForFreeIntervals = (hours: number, day: Array<busyIntervals>): Array<busyIntervals> => {
        const freeIntervals: Array<busyIntervals> = [];

        for (let i = 8; i < 18; i+=hours) {
            let open = true;

            day.forEach(s => {
                if ((s.fromHour >= i && s.fromHour <= i+hours) || (s.toHour >= i && s.toHour <= i+hours)) {
                    open = false;
                }
            })

            if (open == true) {
                freeIntervals.push({
                    fromHour: i,
                    fromMinute: 0,
                    toHour: i+hours,
                    toMinute: 0
                })
            }
        }

        return freeIntervals;
    }

    const checkForFreeTime = (hours: number, notAvailableTimes: busyTime): busyTime => {
        const freeTime: busyTime = {
            seg: checkForFreeIntervals(hours, notAvailableTimes.seg),
            ter: checkForFreeIntervals(hours, notAvailableTimes.ter),
            qua: checkForFreeIntervals(hours, notAvailableTimes.qua),
            qui: checkForFreeIntervals(hours, notAvailableTimes.qui),
            sex: checkForFreeIntervals(hours, notAvailableTimes.sex),
            sab: checkForFreeIntervals(hours, notAvailableTimes.sab),
            dom: checkForFreeIntervals(hours, notAvailableTimes.dom)
        }

        return freeTime;
    }

    const loadNewMeeting = () => {
        if (newMeeting.endHour !== 0 && newMeeting.startHour !== 0) {
            return;
        }

        const busyTime: busyTime = {
            seg: [],
            ter: [],
            qua: [],
            qui: [],
            sex: [],
            sab: [],
            dom: []
        }

        teachers.forEach(teacher => {
            teacher.meetings.forEach(meeting => {
                // eslint-disable-next-line no-case-declarations
                const newValue: busyIntervals = {
                    fromHour: meeting.startHour,
                    fromMinute: meeting.startMinute,
                    toHour: meeting.endHour,
                    toMinute: meeting.endMinute
                };

                switch (meeting.weekDay) {
                    case 1:
                        busyTime.seg.push(newValue);
                        break;
                    case 2:
                        busyTime.ter.push(newValue);
                        break;
                    case 3:
                        busyTime.qua.push(newValue);
                        break;
                    case 4:
                        busyTime.qui.push(newValue);
                        break;
                    case 5:
                        busyTime.sex.push(newValue);
                        break;
                    case 6:
                        busyTime.sab.push(newValue);
                        break;
                    case 7:
                        busyTime.dom.push(newValue);
                        break;
                    default:
                        break;
                }
            })
        })

        const freeTimeTable = checkForFreeTime(2, busyTime);

        const choosenSlot: choosenSlot = 
            freeTimeTable.seg.length > 0 
            ? 
                {
                    ...freeTimeTable.seg[0],
                    weekDay: 1
                }
            :
            freeTimeTable.ter.length > 0
            ?
                {
                    ...freeTimeTable.ter[0],
                    weekDay: 1
                }
            :
            freeTimeTable.qua.length > 0
            ?
                {
                    ...freeTimeTable.qua[0],
                    weekDay: 1
                }
            :
            freeTimeTable.qui.length > 0
            ?
                {
                    ...freeTimeTable.qui[0],
                    weekDay: 1
                }
            :
            freeTimeTable.sex.length > 0
            ?
                {
                    ...freeTimeTable.sex[0],
                    weekDay: 1
                }
            :
            freeTimeTable.sab.length > 0
            ?
                {
                    ...freeTimeTable.sab[0],
                    weekDay: 1
                }
            :
            freeTimeTable.dom.length > 0
            ?
                {
                    ...freeTimeTable.dom[0],
                    weekDay: 1
                }
            :
                null;

        const currentNewMeeting: newMeetingType = {
            format: "newMeeting",
            startHour: choosenSlot !== null ? choosenSlot.fromHour : 0,
            startMinute: 0,
            endHour: choosenSlot !== null ? choosenSlot.toHour : 0,
            endMinute: 0,
            professors: [],
            turmaId: 0,
            weekDay: choosenSlot !== null ? choosenSlot.weekDay : 0
        }

        setNewMeeting(currentNewMeeting);

        setFreeTime(freeTimeTable);
    }

    const createNewFile = (data: choosenTeachers) => {
        const teachersList = [
            teachers.filter(s => s.id == data.secretario)[0],
            teachers.filter(s => s.id == data.coordenador)[0],
            teachers.filter(s => s.id == data.orientador)[0]
        ]

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(teachersList)));
        element.setAttribute('download', "professores.json");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return (
        <section className="manager" onLoad={() => loadNewMeeting()}>
            <DetailedCell 
                newMeeting={newMeeting} 
                changePage={changePage}
            />
            <ChooseTeacher changePage={changePage} teachers={teachers} createNewFile={createNewFile} />
        </section>
    )
}

interface busyIntervals {
    fromHour: number;
    fromMinute: number;
    toHour: number;
    toMinute: number;
}

type choosenSlot = {
    fromHour: number;
    fromMinute: number;
    toHour: number;
    toMinute: number;
    weekDay: number;
} | null;

interface busyTime {
    seg: Array<busyIntervals>;
    ter: Array<busyIntervals>;
    qua: Array<busyIntervals>;
    qui: Array<busyIntervals>;
    sex: Array<busyIntervals>;
    sab: Array<busyIntervals>;
    dom: Array<busyIntervals>;
}

interface choosenTeachers {
    secretario: number;
    coordenador: number;
    orientador: number;
}

type teacherType = "secretario" | "coordenador" | "orientador";

interface teacherMeetings {
    turmaId: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
    professors: Array<number>;
}

interface teachersObject {
    format: string;
    id: number;
    name: string;
    type: teacherType;
    meetings: Array<teacherMeetings>
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
    changePage: (page: string) => void;
    teachers: Array<teachersObject>;
    setNewMeeting: (meeting: newMeetingType) => void;
    setFreeTime: (time: busyTime) => void;
    newMeeting: newMeetingType;
}