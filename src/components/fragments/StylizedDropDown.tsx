/* eslint-disable react-hooks/exhaustive-deps */
// Styles
import "../../styles/StylizedDropDown.css"

// Assets
import CaretDownIcon from "../../assets/caret_down.svg"
import { useEffect } from "react";

export const StylizedDropDown = (props: propsType) => {
    const {
        type,
        title,
        list,
        chooseItem,
        choosenItem,
        choosenName
    } = props;

    const handleChooseItem = (item: number, name: string) => {
        chooseItem(item);

        const titleElement = document.querySelector(".combobox-title." + type + " > p") as HTMLSpanElement;
        titleElement.innerText = title + " - " + name;
    }

    useEffect(() => {
        if (choosenItem !== -1) {
            handleChooseItem(choosenItem, choosenName);
        }
    }, [choosenItem, choosenName])

    return (
        <nav className='combobox choose-page pointer-on-hover'>
            <span className={'combobox-title ' + type} onClick={() => {
                document.querySelector(".combobox-body." + type)?.classList.toggle("open");
                document.querySelector(".combobox-icon." + type)?.classList.toggle("tilt");
            }}>
                <img className={'combobox-icon ' + type} src={CaretDownIcon} alt="Open" />
                <p>
                    {
                        title
                    }
                </p>
            </span>
            <div className={'combobox-body ' + type}>
                {
                    list.map(i => <li className='click' onClick={() => handleChooseItem(i.id, i.name)}>{i.name}</li>)
                }
            </div>
        </nav>
    )
}

interface listObject {
    name: string;
    id: number;
}

type propsType = {
    type: string;
    title: string;
    list: Array<listObject>;
    chooseItem: (item: number) => void;
    choosenItem: number;
    choosenName: string;
};