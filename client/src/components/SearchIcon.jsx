import { useContext } from "react";
import { context, toggleForm } from "./Utils";

export default function SearchIcon() {
    const localContext = useContext(context);
    const setCategoryStr = localContext.setCategoryStr;

    return (
        <a href="#products">
            <div
                className="fas fa-search"
                id="search-btn"
                onClick={() => {
                    setCategoryStr("Products");
                    toggleForm(".search-form");
                }}
            ></div>
        </a>
    );
}
