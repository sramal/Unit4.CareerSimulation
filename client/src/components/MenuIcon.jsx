import { toggleForm } from "./Utils";

export default function MenuIcon() {
    return (
        <div
            className="fas fa-bars"
            id="menu-btn"
            onClick={() => toggleForm(".navbar")}
        ></div>
    );
}
