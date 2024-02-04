// Styles
import "../../styles/SlotsTable.css";

// Dependencies
import { useCallback, useEffect } from "react";

export const SlotsTable = (props: propsType) => {
    const {
        selectedStartingCell,
        handleChangeEndingCell,
        handleChangeStartingCell,
        slots
    } = props;

    const weekDay = (id: number): string => {
        switch (id) {
          case 1:
            return "SEG";
            break;
          case 2:
            return "TER";
            break;
          case 3:
            return "QUA";
            break;
          case 4:
            return "QUI";
            break;
          case 5:
            return "SEX";
            break;
          case 6:
            return "SAB";
            break;
          case 7:
            return "DOM";
            break;
          default:
            return "ERROR"
        }
      }

    const setEventListener = useCallback((elemennt: Element) => {
        elemennt.addEventListener("click", () => {
            if (selectedStartingCell == "") {
                handleChangeStartingCell(elemennt.parentElement?.className.split("cell-")[1] as string);
            }
            else {
                const day = 
                    Number((elemennt.parentElement?.className
                        .split("cell-")[1])
                        ?.split("-")[1]);
                if (
                    weekDay(day)
                    ===
                    selectedStartingCell.split("-")[1].trim()
                ) {
                    const endingHour = 
                        Number(elemennt.parentElement
                            ?.className
                                .split("cell-")[1]
                                .split("-")[0]) + 8;
                    const startingHour = 
                        Number(selectedStartingCell
                            .split("-")[0]
                            .split(":")[0]);

                    if (
                        endingHour > startingHour
                    ) {
                        handleChangeEndingCell(elemennt.parentElement?.className.split("cell-")[1] as string);
                    }
                }
            }
        })
    }, [handleChangeEndingCell, handleChangeStartingCell, selectedStartingCell])

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

                            setEventListener(s);
                        }
                        else {
                            s.innerHTML = "Ocupado"
                        }
                    })
                }
            }
        })
    }, [handleChangeEndingCell, handleChangeStartingCell, selectedStartingCell, setEventListener, slots])

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
    selectedStartingCell: string;
    handleChangeEndingCell: (cell: string) => void;
    handleChangeStartingCell: (cell: string) => void;
    slots: Array<slotsInterface>;
}