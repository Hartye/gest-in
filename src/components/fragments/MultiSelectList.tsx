// Style
import { useEffect } from "react";
import "../../styles/MultiSelectList.css"

export const MultiSelectList = (props: propsType) => {
    const {
        freeTeachers,
        title,
        addTeacher,
        removeTeacher
    } = props;

    const handleCheckBoxClick = (id: number) => {
        try {
            const checkBox = document.querySelector("#item-" + id) as HTMLInputElement;

            if (checkBox.checked) {
                addTeacher(id);
            }
            else {
                removeTeacher(id);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const checkBoxes = document.querySelectorAll(".list div.item label input") as NodeListOf<HTMLInputElement>

        checkBoxes.forEach(s => {
            addTeacher(Number(s.id.split('-')[1]));
        })
    }, [addTeacher])

    return (
        <div className="multi-select-list">
            <h2>{title}</h2>
            <div className="list">
                {
                    freeTeachers.map((item, index) =>
                        <div className="item">
                            <label key={index} className="pointer-on-hover">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    id={"item-" + String(item.id)}
                                    className="pointer-on-hover"
                                    onClick={() => {
                                        console.log("I tried")
                                        handleCheckBoxClick(item.id);
                                    }}
                                />
                                {
                                    item.name
                                }
                            </label>

                        </div>
                    )
                }
            </div>
        </div>
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

type propsType = {
    freeTeachers: Array<teachersObject>;
    title: string;
    addTeacher: (teacherId: number) => void;
    removeTeacher: (teacherId: number) => void;
}