// Styles
import "../styles/LogInPopUp.css"

export const LogInPopUp = (props: propsType) => {
    const {
        logInOpen,
        changeLogInState,
        logIn
    } = props;

    const handleLogIn = () => {
        const user = document.querySelector("#log-in-user") as HTMLInputElement;
        const pass = document.querySelector("#log-in-pass") as HTMLInputElement;

        logIn(Number(user.value), pass.value);
    }

    return (
        <section className="log-in-pop-up">
            {
                logInOpen === false 
                ?
                <div className="close">
                    <button className="shadow-gray pointer-on-hover click" onClick={() => {
                        changeLogInState(true)
                    }}>LogIn</button>
                </div>
                :
                <div className="open">
                    <label>
                        Número
                        <input type="number" id="log-in-user" />
                    </label>
                    <label>
                        Senha
                        <input type="password" id="log-in-pass" />
                    </label>
                    <button className="shadow-gray pointer-on-hover click" onClick={() => {
                        handleLogIn();
                    }}>Confirmar</button>
                </div>
            }
        </section>
    )
}

type propsType = {
    logInOpen: boolean;
    changeLogInState: (state: boolean) => void;
    logIn: (user: number, pass: string) => void;
}