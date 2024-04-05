import { useContext } from "react";
import { context, toggleForm } from "./Utils";

export default function RegisterIcon() {
    const localContext = useContext(context);
    const setUsername = localContext.setUsername;
    const setPassword = localContext.setPassword;
    const setRegisterMessage = localContext.setRegisterMessage;

    return (
        <div
            className="fas fa-user-plus"
            id="register-btn"
            onClick={() => {
                setUsername("");
                setPassword("");
                setRegisterMessage({});
                toggleForm(".register-form");
            }}
        ></div>
    );
}
