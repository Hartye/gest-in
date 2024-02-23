// Styles
import "../../styles/SlotsTable.css";

// Dependencies
import { useEffect } from "react";

export const SimpleSlotsTable = (props: propsType) => {
    const {
        teachers,
        turmas,
    } = props;

    // This will run on load just once
    useEffect(() => {
        const divContent = document.querySelector(".content") as HTMLDivElement;
        divContent.innerHTML = "";

        for (let i = 0; i <= 10; i++) {
            divContent.innerHTML += `
                <div>
                    <div>${(8 + i) < 10 ? "0" + (8 + i) : (8 + i)}:00</div>
                    <div>
                        <span class="first both"></span>
                        <span class="second both"></span>
                    </div>
                    <div>
                        <span class="first both"></span>
                        <span class="second both"></span>
                    </div>
                    <div>
                        <span class="first both"></span>
                        <span class="second both"></span>
                    </div>
                    <div>
                        <span class="first both"></span>
                        <span class="second both"></span>
                    </div>
                    <div>
                        <span class="first both"></span>
                        <span class="second both"></span>
                    </div>
                    <div>
                        <span class="first both"></span>
                        <span class="second both"></span>
                    </div>
                    <div>
                        <span class="first both"></span>
                        <span class="second both"></span>
                    </div>
                </div>
            `;
        }

        const allRows = document.querySelectorAll(".content > div");

        for (let p = 0; p < allRows.length; p++) {
            for (let i = 0; i < allRows[p].children.length; i++) {
                if (i == 0) {
                    allRows[p].children[i].classList.add(`cell-${p}-${i}`);
                    allRows[p].children[i].classList.add(`hour`);
                }
                else {
                    allRows[p].children[i].classList.add(`cell-${p}-${i}`);
                }
            }
        }
    });

    useEffect(() => {
        if (teachers === undefined) {
            return;
        }

        teachers.forEach(teacher => {
            teacher.meetings.forEach(meeting => {
                let startingCell: number = meeting.startHour - 8;
                const endingCell: number = meeting.endHour - 8;

                if (
                    (startingCell < 0 || startingCell > 10) ||
                    startingCell > endingCell ||
                    (endingCell < 0 || endingCell > 10)
                ) {
                    startingCell = -1;
                }

                if (startingCell !== -1) {
                    const duration: number = (endingCell - startingCell);
                    for (let i = 0; i < duration; i++) {
                        let preciseCell: string = "";
                        if (i == 0) {
                            if (meeting.startMinute >= 30) {
                                preciseCell = "second";
                            }
                            else {
                                preciseCell = "both"
                            }
                        }
                        else {
                            if (duration === i) {
                                if (meeting.endMinute <= 30) {
                                    preciseCell = "first";
                                }
                                else {
                                    preciseCell = "both";
                                }
                            }
                            else {
                                preciseCell = "both";
                            }
                        }

                        const cell = `.cell-${startingCell + i}-${meeting.weekDay} .${preciseCell}`;
                        document.querySelectorAll(cell)?.forEach(s => {
                            s.innerHTML = turmas.find(i => i.id === meeting.turmaId)?.sigla as string;
                            s.classList.add("red");
                        })
                    }
                }
            })
        })
    }, [
        teachers,
        turmas
    ])

    return (
        <div className="slots-table">
            <div className="header">
                <div></div>
                <div>SEG</div>
                <div>TER</div>
                <div>QUA</div>
                <div>QUI</div>
                <div>SEX</div>
                <div>SAB</div>
                <div>DOM</div>
            </div>
            <div className="content">

            </div>
        </div>
    )
}

type turmaType = {
    format: string;
    sigla: string;
    id: number;
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

type propsType = {
    teachers: Array<teachersObject>;
    turmas: Array<turmaType>;
}