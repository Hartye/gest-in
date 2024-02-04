// Components
import { useState } from 'react'
import { Canvas } from './pages/Canvas'
import { SideControllers } from './components/SideControllers'

// Styles
import './styles/App.css'
import { MeetingManager } from './pages/MeetingManager'

const App = () => {
  const [info, setInfo] = useState(Array<infoType>);
  const [page, setPage] = useState("canvas");
  const [teachers, setTeachers] = useState(Array<teachersObject>)
  const [selectedStartingCell, setSelectedStartingCell] = useState("");
  const [selectedEndingCell, setSelectedEndingCell] = useState("");

  const handleChangeStartingCell = (cell: string) => {
    let translatedHour = "";
    if (cell !== "") {
      translatedHour = String(
        Number(cell.split("-")[0]) < 2
          ? "0" + (Number(cell.split("-")[0]) + 8) + ":00 - " + weekDay(Number(cell.split("-")[1]))
          : (Number(cell.split("-")[0]) + 8) + ":00 - " + weekDay(Number(cell.split("-")[1]))
      );
    }

    setSelectedStartingCell(translatedHour);
  }

  const handleChangeEndingCell = (cell: string) => {
    let translatedHour = "";
    if (cell !== "") {
      translatedHour = String(
        Number(cell.split("-")[0]) < 2
          ? "0" + (Number(cell.split("-")[0]) + 8) + ":00 - " + weekDay(Number(cell.split("-")[1]))
          : (Number(cell.split("-")[0]) + 8) + ":00 - " + weekDay(Number(cell.split("-")[1]))
      );
    }

    setSelectedEndingCell(translatedHour);
  }

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

  const changeInfo = (data: Array<infoType>): void => {
    setInfo(data);
  }

  const changePage = (page: string) => {
    setPage(page);
  }

  const handleSetTeachers = (data: Array<teachersObject>) => {
    setTeachers(data);
  }

  return (
    <main>
      <aside>
        <SideControllers
          handleSetTeachers={handleSetTeachers}
          changePage={changePage}
          changeInfo={changeInfo}
          selectedStartingCell={selectedStartingCell}
          selectedEndingCell={selectedEndingCell}
          handleChangeEndingCell={handleChangeEndingCell}
          handleChangeStartingCell={handleChangeStartingCell}

        />
      </aside>
      <section>
        {
          page == "canvas"
            ? <Canvas
              info={info}
              selectedStartingCell={selectedStartingCell}
              handleChangeEndingCell={handleChangeEndingCell}
              handleChangeStartingCell={handleChangeStartingCell}
            />
            : page == "manager"
              && <MeetingManager changePage={changePage} teachers={teachers} />
        }
      </section>
    </main>
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

type infoType = {
  type: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  weekDay: number;
}

export default App
