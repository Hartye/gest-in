// Styles
import "../styles/LogIn.css"

// Components
import { useState } from "react";
import { LogInPopUp } from "../components/LogInPopUp";

export const LogIn = (props: propsType) => {
    const {
        apiBase,
        setUser
    } = props;

    // API
    const apiLogIn = "/login";

    const [logInOpen, setLogInOpen] = useState(false);

    const handleChangeLogInState = (state: boolean) => {
        setLogInOpen(state);
    }

    const handleLogIn = (user: number, pass: string) => {
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
                if (data == false) {
                    // Problem loggin in
                }
                else {
                    // Logged In
                    setUser(user, pass, data);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <section className="log-in-back">
            <div className="log-in-front">
                <div>
                    <p>Para acessar a plataforma faça o login com a sua conta.</p>
                    <span>
                        Ao fazer o login será redirecionado automaticamente para a plataforma.
                    </span>
                    <LogInPopUp logIn={handleLogIn} changeLogInState={handleChangeLogInState} logInOpen={logInOpen} />
                </div>
                <button className="shadow-gray pointer-on-hover click" onClick={() => {
                    history.back();
                }}>Cancelar</button>
            </div>
        </section>
    )
}

type propsType = {
    apiBase: string;
    setUser: (user: number, pass: string, role: string) => void;
}