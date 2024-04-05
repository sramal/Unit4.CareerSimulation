import { useContext } from "react";
import { context, toggleForm } from "./Utils";

export default function LoginIcon() {
    const localContext = useContext(context);
    const setUsername = localContext.setUsername;
    const setPassword = localContext.setPassword;
    const setLoginMessage = localContext.setLoginMessage;

    return (
        <div
            className="fas fa-sign-in"
            id="login-btn"
            onClick={() => {
                setUsername("");
                setPassword("");
                setLoginMessage({});
                toggleForm(".login-form");
            }}
        ></div>
    );
}
