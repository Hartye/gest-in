// Components
import { useState } from 'react'
import { Canvas } from './pages/Canvas'
import { SideControllers } from './components/SideControllers'
import { MeetingManager } from './pages/MeetingManager'
import { SetFiles } from './pages/SetFiles'

// Styles
import './styles/App.css'

export const App = () => {
  const tempMeeting: newMeetingType = {
    endHour: 0,
    endMinute: 0,
    format: "newMeeting",
    professors: [],
    startHour: 0,
    startMinute: 0,
    turmaId: 0,
    weekDay: 0
  };

  const tempFreeTime: busyTime = {
    seg: [],
    ter: [],
    qua: [],
    qui: [],
    sex: [],
    sab: [],
    dom: []
  }

  const [turma, setTurma] = useState(Array<turmaType>);
  const [page, setPage] = useState("read");
  const [teachers, setTeachers] = useState(Array<teachersObject>)
  const [newMeeting, setNewMeeting] = useState(tempMeeting);
  const [freeTime, setFreeTime] = useState(tempFreeTime);

  const updateNewMeetingHours = (fromHour: number, toHour: number, weekDay: number) => {
    const newMeetingWithNewHours = {
      endHour: toHour,
      startHour: fromHour,
      weekDay: weekDay,
      endMinute: newMeeting.endMinute,
      startMinute: newMeeting.startMinute,
      format: newMeeting.format,
      professors: newMeeting.professors,
      turmaId: newMeeting.turmaId
    }
    
    setNewMeeting(newMeetingWithNewHours);
    
    console.log("New Meeting With Changed Hours");
    console.log(newMeetingWithNewHours);
  }

  const changeturma = (data: Array<turmaType>): void => {
    setTurma(data);
  }

  const changePage = (page: string) => {
    setPage(page);
  }

  const handleSetTeachers = (data: Array<teachersObject>) => {
    setTeachers(data);
  }

  const handleSetNewMeeting = (meeting: newMeetingType) => {
    setNewMeeting(meeting);
  }

  const handleSetFreeTime = (time: busyTime) => {
    setFreeTime(time);

    // For debug
    console.log("Free time from App")
    console.log(time);
  }

  return (
    <main>
      <aside>
        <SideControllers
          newMeeting={newMeeting}
          changePage={changePage}

        />
      </aside>
      <section>
        {
          page === "canvas"
            ? <Canvas
              changePage={changePage}
              turmas={turma}
              teachers={teachers}
              freeTime={freeTime}
              setNewMeetingHours={updateNewMeetingHours}
            />
            : page === "manager"
              ? <MeetingManager
                changePage={changePage}
                teachers={teachers}
                newMeeting={newMeeting}
                setFreeTime={handleSetFreeTime}
                setNewMeeting={handleSetNewMeeting}
              />
              : page === "read" &&
              <SetFiles
                setTurma={changeturma}
                setTeacher={handleSetTeachers}
                changePage={changePage} />
        }
      </section>
    </main>
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

interface busyIntervals {
  fromHour: number;
  fromMinute: number;
  toHour: number;
  toMinute: number;
}

interface busyTime {
  seg: Array<busyIntervals>;
  ter: Array<busyIntervals>;
  qua: Array<busyIntervals>;
  qui: Array<busyIntervals>;
  sex: Array<busyIntervals>;
  sab: Array<busyIntervals>;
  dom: Array<busyIntervals>;
}