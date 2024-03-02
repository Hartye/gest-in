/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Styles
import "../styles/Manager.css";

// Components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "../components/Canvas";
import { MeetingManager } from "../components/MeetingManager";
import { SetFiles } from "../components/SetFiles";
import { SideControllers } from "../components/SideControllers";

export const Manager = (props: propsType) => {
  const {
    apiBase,
    user,
    pass,
    setUser
  } = props;

  // API
  const apiUrlBase = apiBase;
  const apiUrlMerge = apiUrlBase + "/merge";
  const apiUrlNewMeeting = apiUrlBase + "/new/meeting";
  const apiUrlFreeTeachers = apiUrlBase + "/free/teachers";
  const apiUrlLogin = apiUrlBase + "/login";
  const apiUrlNewMeetingOpen = apiUrlBase + "/new/meeting/open";
  const apiUrlUpdateNewMeeting = apiUrlBase + "/update/new/meeting";
  const apiUrlGetInfo = apiUrlBase + "/get/info";

  const navigate = useNavigate();

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

  const changeturma = (data: Array<turmaType>) => {
    setTurma(data);
  };

  const handleSetTeachers = (data: Array<teachersObject>) => {
    setTeachers(data);
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
    // Ask back-end to update newMeeting on firestore
    const url = new Request(apiUrlUpdateNewMeeting);

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        newMeeting: meeting
      })
    })
      .catch((err) => console.log(err));
  }

  const isNewMeetingOpen = () => {
    const url = new Request(apiUrlNewMeetingOpen);

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          changePage("manager");
        }
      })
      .catch((err) => console.log(err));
  }

  const checkUser = () => {
    const url = new Request(apiUrlLogin);

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        pass: pass
      })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data == false || data != "manager") {
          location.pathname = "/";
        }
        else {
          isNewMeetingOpen();
        }
      })
      .catch((err) => console.log(err));
  }

  const handleLogOut = () => {
    setUser(-1, "", "");
  }

  useEffect(() => {
    if (user == -1) {
      navigate("/");
    }
  }, [user, navigate])

  useEffect(() => {
    updateFreeTeachers(newMeeting);
  }, [teachers, newMeeting]);

  return (
    <main onLoad={() => checkUser()}>
      <aside>
        <SideControllers apiBase={apiBase} logOut={handleLogOut} newMeeting={newMeeting} changePage={changePage} />
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
            full={true}
            changePage={changePage}
            turmas={turma}
            teachers={teachers}
            freeTeachers={freeTeachers}
            newMeeting={newMeeting}
            setFreeTime={handleSetFreeTime}
            setNewMeeting={handleSetNewMeeting}
            setTurma={changeturma}
            setTeacher={handleSetTeachers}
            apiUrlNewMeeting={apiUrlNewMeeting}
            apiUrlMerge={apiUrlMerge}
            apiBase={apiBase}
            addTeacher={addTeacherToNewMeeting}
            removeTeacher={removeTeacherToNewMeeting}
            changeSecretario={changeSecretarioNewMeeting}
            changeOrientador={changeOrientadorNewMeeting}
            changeCoordenador={changeCoordenadorNewMeeting}
          />
        ) : (
          page === "read" && (
            <SetFiles
              apiBase={apiBase}
              setTurma={changeturma}
              setTeacher={handleSetTeachers}
              changePage={changePage}
              logOut={handleLogOut}
              apiUrlGetInfo={apiUrlGetInfo}
              apiUrlNewMeeting={apiUrlNewMeeting}
              apiUrlUpdateNewMeeting={apiUrlUpdateNewMeeting}
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
  user: number;
  pass: string;
  apiBase: string;
  setUser: (user: number, pass: string, role: string) => void;
};
