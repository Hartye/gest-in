// Styles
import "../../styles/SlotsTable.css";

// Dependencies
import { useEffect } from "react";

export const SlotsTable = (props: propsType) => {
    const {
        slots
    } = props;

    // This will run on every load just once
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
        if (slots === undefined) {
            return;
        }

        slots.forEach(slot => {
            let startingCell: number = slot.startHour - 8;
            const endingCell: number = slot.endHour - 8;

            if (
                (startingCell < 0 || startingCell > 10) ||
                startingCell > endingCell ||
                (endingCell < 0 || endingCell > 10)
            ) {
                startingCell = -1;
            }

            if (startingCell !== -1) {
                const duration: number = (endingCell - startingCell);
                for (let i = 0; i < duration + 1; i++) {
                    let preciseCell: string = "";
                    if (i == 0) {
                        if (slot.startMinute >= 30) {
                            preciseCell = "second";
                        }
                        else {
                            preciseCell = "both"
                        }
                    }
                    else {
                        if (duration === i) {
                            if (slot.endMinute <= 30) {
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

                    const cell = `.cell-${startingCell + i}-${slot.weekDay} .${preciseCell}`;
                    document.querySelectorAll(cell)?.forEach(s => {
                        s.classList.add(slot.type);
                        if (slot.type == "green") {
                            s.innerHTML = "Disponível"
                        }
                        else {
                            s.innerHTML = "Ocupado"
                        }
                    })
                }
            }
        })
    }, [slots])

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

interface slotsInterface {
    type: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay: number;
}

type propsType = {
    slots: Array<slotsInterface>;
}