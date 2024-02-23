// Styles
import "../styles/Manager.css";

// Components
import { useState } from "react";
import { Canvas } from "../components/Canvas";
import { MeetingManager } from "../components/MeetingManager";
import { SetFiles } from "../components/SetFiles";
import { SideControllers } from "../components/SideControllers";

// Firebase
import { collection, addDoc } from "firebase/firestore";
// @ts-expect-error
import { db } from "../firebase-config.js";

export const Manager = (props: propsType) => {
  const { apiBase } = props;

  // Firebase
  const refToTeachers = collection(db, "teachers");
  const refToTurmas = collection(db, "turmas");
  const refToNewMeeting = collection(db, "newMeeting");

  // API
  const apiUrlBase = apiBase;
  const apiUrlMerge = apiUrlBase + "/merge";
  const apiUrlNewMeeting = apiUrlBase + "/new/meeting";
  const apiUrlFreeTeachers = apiUrlBase + "/free/teachers";

  const tempMeeting: newMeetingType = {
    endHour: 0,
    endMinute: 0,
    format: "newMeeting",
    professors: [],
    startHour: 0,
    startMinute: 0,
    sigla: "Nome de turma",
    turmaId: 0,
    weekDay: 0,
    orientador: -1,
    secretario: -1,
    coordenador: -1,
  };

  const tempFreeTime: busyTime = {
    seg: [],
    ter: [],
    qua: [],
    qui: [],
    sex: [],
    sab: [],
    dom: [],
  };

  const [turma, setTurma] = useState(Array<turmaType>);
  const [page, setPage] = useState("read");
  const [teachers, setTeachers] = useState(Array<teachersObject>);
  const [freeTeachers, setFreeTeachers] = useState(Array<teachersObject>);
  const [newMeeting, setNewMeeting] = useState(tempMeeting);
  const [freeTime, setFreeTime] = useState(tempFreeTime);

  const updateFreeTeachers = (meeting: newMeetingType) => {
    const url = new Request(apiUrlFreeTeachers);

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        meeting: {
          startHour: meeting.startHour,
          endHour: meeting.endHour,
          weekDay: meeting.weekDay,
        },
        professores: teachers,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setFreeTeachers(data);
      })
      .catch((err) => console.log(err));
  };

  const updateNewMeetingHours = (
    fromHour: number,
    toHour: number,
    weekDay: number
  ) => {
    const newMeetingWithNewHours = newMeeting;
    newMeetingWithNewHours.endHour = toHour;
    newMeetingWithNewHours.startHour = fromHour;
    newMeetingWithNewHours.weekDay = weekDay;

    setNewMeeting(newMeetingWithNewHours);
    updateFreeTeachers(newMeetingWithNewHours);
    updateNewMeetingOnFirestore(newMeetingWithNewHours);

    console.log("New Meeting With Changed Hours");
    console.log(newMeetingWithNewHours);
  };

  const changeSecretarioNewMeeting = (teacherId: number) => {
    const newMeetingWithNewSecretario = newMeeting;
    newMeetingWithNewSecretario.secretario = teacherId;
    newMeetingWithNewSecretario.professors =
      newMeetingWithNewSecretario.professors.filter((s) => s != teacherId);
    setNewMeeting(newMeetingWithNewSecretario);
    updateNewMeetingOnFirestore(newMeetingWithNewSecretario);
  };

  const changeOrientadorNewMeeting = (teacherId: number) => {
    const newMeetingWithNewOrientador = newMeeting;
    newMeetingWithNewOrientador.orientador = teacherId;
    newMeetingWithNewOrientador.professors =
      newMeetingWithNewOrientador.professors.filter((s) => s != teacherId);
    setNewMeeting(newMeetingWithNewOrientador);
    updateNewMeetingOnFirestore(newMeetingWithNewOrientador);
  };

  const changeCoordenadorNewMeeting = (teacherId: number) => {
    const newMeetingWithNewCoordenador = newMeeting;
    newMeetingWithNewCoordenador.coordenador = teacherId;
    newMeetingWithNewCoordenador.professors =
      newMeetingWithNewCoordenador.professors.filter((s) => s != teacherId);
    setNewMeeting(newMeetingWithNewCoordenador);
    updateNewMeetingOnFirestore(newMeetingWithNewCoordenador);
  };

  const addTeacherToNewMeeting = (teacherId: number) => {
    const newMeetingWithNewTeachers: newMeetingType = newMeeting;

    if (
      newMeetingWithNewTeachers.professors.find((s) => s == teacherId) ===
      undefined
    ) {
      newMeetingWithNewTeachers.professors.push(teacherId);
    }

    setNewMeeting(newMeetingWithNewTeachers);
    updateNewMeetingOnFirestore(newMeetingWithNewTeachers);
  };

  const removeTeacherToNewMeeting = (teacherId: number) => {
    if (
      newMeeting.secretario != teacherId &&
      newMeeting.orientador != teacherId &&
      newMeeting.coordenador != teacherId
    ) {
      const newMeetingWithNewTeachersGone: newMeetingType = newMeeting;

      newMeetingWithNewTeachersGone.professors = newMeeting.professors.filter(
        (s) => s !== teacherId
      );

      console.log("Remove teacher");
      console.log("id " + teacherId);
      console.log(newMeetingWithNewTeachersGone);

      setNewMeeting(newMeetingWithNewTeachersGone);
      updateNewMeetingOnFirestore(newMeetingWithNewTeachersGone);
    }
  };

  const removeAllTeachersFromNewMeeting = () => {
    const newMeetingWithNewTeachersGone: newMeetingType = newMeeting;

    newMeetingWithNewTeachersGone.professors = [];

    setNewMeeting(newMeetingWithNewTeachersGone);
    updateNewMeetingOnFirestore(newMeetingWithNewTeachersGone);
  };

  const changeturma = async (data: Array<turmaType>): Promise<void> => {
    setTurma(data);

    await addDoc(
        refToTurmas,
        {
            turma: data
        }
    )
  };

  const changePage = (page: string) => {
    if (page === "read") {
      setTurma([]);
      setTeachers([]);
      setNewMeeting(tempMeeting);
      setFreeTime(tempFreeTime);
    }

    if (page === "canvas") {
      removeAllTeachersFromNewMeeting();
    }

    setPage(page);
  };

  const handleSetTeachers = async (data: Array<teachersObject>) => {
    setTeachers(data);

    await addDoc(
        refToTeachers,
        {
            teachers: data
        }
    )
  };

  const handleSetNewMeeting = (meeting: newMeetingType) => {
    setNewMeeting(meeting);
    updateFreeTeachers(meeting);
    updateNewMeetingOnFirestore(meeting);
  };

  const handleSetFreeTime = (time: busyTime) => {
    setFreeTime(time);

    // For debug
    console.log("Free time from App");
    console.log(time);
  };

  const updateNewMeetingOnFirestore = async (meeting: newMeetingType) => {
    await addDoc(
      refToNewMeeting,
      {
        newMeeting: meeting
      }
    )
  }

  return (
    <main>
      <aside>
        <SideControllers newMeeting={newMeeting} changePage={changePage} />
      </aside>
      <section>
        {page === "canvas" ? (
          <Canvas
            changePage={changePage}
            turmas={turma}
            teachers={teachers}
            freeTime={freeTime}
            setNewMeetingHours={updateNewMeetingHours}
          />
        ) : page === "manager" ? (
          <MeetingManager
            changePage={changePage}
            turmas={turma}
            teachers={teachers}
            freeTeachers={freeTeachers}
            newMeeting={newMeeting}
            setFreeTime={handleSetFreeTime}
            setNewMeeting={handleSetNewMeeting}
            apiUrlNewMeeting={apiUrlNewMeeting}
            apiUrlMerge={apiUrlMerge}
            addTeacher={addTeacherToNewMeeting}
            removeTeacher={removeTeacherToNewMeeting}
            changeSecretario={changeSecretarioNewMeeting}
            changeOrientador={changeOrientadorNewMeeting}
            changeCoordenador={changeCoordenadorNewMeeting}
          />
        ) : (
          page === "read" && (
            <SetFiles
              setTurma={changeturma}
              setTeacher={handleSetTeachers}
              changePage={changePage}
            />
          )
        )}
      </section>
    </main>
  );
};

type turmaType = {
  format: string;
  sigla: string;
  id: number;
};

type teacherType = "secretario" | "coordenador" | "orientador";

interface teacherMeetings {
  turmaId: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  weekDay: number;
  orientador: number;
  coordenador: number;
  secretario: number;
  professors: Array<number>;
}

interface teachersObject {
  format: string;
  id: number;
  name: string;
  type: teacherType;
  meetings: Array<teacherMeetings>;
}

type newMeetingType = {
  format: string;
  turmaId: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  weekDay: number;
  sigla: string;
  orientador: number;
  coordenador: number;
  secretario: number;
  professors: Array<number>;
};

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
type propsType = {
  apiBase: string;
};
