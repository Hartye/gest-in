// Componentes
import { SimpleSideControllers } from "../components/SimpleSideControllers";
import { TeacherCanvas } from "../components/TeacherCanvas";

// React
import { useState } from "react";

// Firebase
import { collection, query, getDocs } from "firebase/firestore";
// @ts-expect-error
import { db } from "../firebase-config.js";

export const Teacher = () => {
  const [turma, setTurma] = useState(Array<turmaType>);
  const [teachers, setTeachers] = useState(Array<teachersObject>);

  const makeRequest = async () => {
    const meetingsQuery = query(collection(db, "teachers"));
    const meetingSnapshot = await getDocs(meetingsQuery);
    const turmaQuery = query(collection(db, "turmas"));
    const turmaSnapshot = await getDocs(turmaQuery);

    // teachers
    let tempTeachers: Array<teachersFromFirebase> = [
      {
        data: teachers
      }
    ];

    meetingSnapshot.forEach((doc) => {
      tempTeachers.push({
        data: doc.data() as Array<teachersObject>
      });
    });

    // @ts-expect-error
    console.log(tempTeachers[1].data.teachers);
    tempTeachers.forEach(s => {
      try {
        // @ts-expect-error
        setTeachers(s.data.teachers);
      }
      catch (err) { console.log(err) }
    });

    // Turmas
    let tempTurmas: turmasFromFirebase = {
      data: turma,
    };

    turmaSnapshot.forEach((doc) => {
      tempTurmas.data = doc.data() as Array<turmaType>;
    });

    // @ts-expect-error
    console.log(tempTurmas.data.turma);
    // @ts-expect-error
    setTurma(tempTurmas.data.turma);
  };

  return (
    <main onLoad={() => makeRequest()}>
      <aside>
        <SimpleSideControllers />
      </aside>
      <section>
        <TeacherCanvas turmas={turma} teachers={teachers} />
      </section>
    </main>
  );
};

interface teachersFromFirebase {
  data: Array<teachersObject>;
}

interface turmasFromFirebase {
  data: Array<turmaType>;
}

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
  professors: Array<number>;
}

interface teachersObject {
  format: string;
  id: number;
  name: string;
  type: teacherType;
  meetings: Array<teacherMeetings>;
}
