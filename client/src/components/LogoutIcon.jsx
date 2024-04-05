import { useContext } from "react";
import { context, toggleForm } from "./Utils";

export default function LogoutIcon() {
    const localContext = useContext(context);
    const setLogin = localContext.setLogin;
    const setIsadmin = localContext.setIsadmin;
    const setToken = localContext.setToken;

    const handleLogoutIconClick = (setLogin, setIsadmin, setToken) => {
        setLogin(false);
        setIsadmin(false);
        setToken("");

        toggleForm("");
    };

    return (
        <div
            className="fas fa-sign-out"
            id="logout-btn"
            onClick={() =>
                handleLogoutIconClick(setLogin, setIsadmin, setToken)
            }
        ></div>
    );
}
