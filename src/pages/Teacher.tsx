/* eslint-disable @typescript-eslint/ban-ts-comment */
// Componentes
import { SimpleSideControllers } from "../components/SimpleSideControllers";
import { TeacherCanvas } from "../components/TeacherCanvas";

// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { collection, query, getDocs } from "firebase/firestore";
// @ts-expect-error
import { db } from "../firebase-config.js";

export const Teacher = (props: propsType) => {
    const {
        user,
        pass,
        apiBase,
        setUser
    } = props;

    const [turma, setTurma] = useState(Array<turmaType>);
    const [teachers, setTeachers] = useState(Array<teachersObject>);

    // API
    const apiLogIn = "/login";
    const apiUrlGetMeetingsByHour = apiBase + "/get/info/by/hour";

    const navigate = useNavigate();

    const makeRequest = async () => {
        const meetingsQuery = query(collection(db, "teachers"));
        const meetingSnapshot = await getDocs(meetingsQuery);
        const turmaQuery = query(collection(db, "turmas"));
        const turmaSnapshot = await getDocs(turmaQuery);

        // teachers
        const tempTeachers: Array<teachersFromFirebase> = [
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
        const tempTurmas: turmasFromFirebase = {
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

    const checkUser = () => {
        const url = new Request(apiBase + apiLogIn);

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
                if (data == false || data != "teacher") {
                    location.pathname = "/";
                }
                else {
                    makeRequest();
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

    return (
        <main onLoad={() => checkUser()}>
            <aside>
                <SimpleSideControllers logOut={handleLogOut} />
            </aside>
            <section>
                <TeacherCanvas turmas={turma} teachers={teachers} apiUrlGetMeetingsByHour={apiUrlGetMeetingsByHour} />
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

type propsType = {
    user: number;
    pass: string;
    apiBase: string;
    setUser: (user: number, pass: string, role: string) => void;
}