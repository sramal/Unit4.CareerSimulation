import { useContext } from "react";
import { context } from "./Utils";

export default function Search() {
    const localContext = useContext(context);
    const searchStr = localContext.searchStr;
    const setSearchStr = localContext.setSearchStr;

    return (
        <>
            <form className="search-form">
                <input
                    type="search"
                    id="search-box"
                    placeholder="search here..."
                    name="search-box"
                    value={searchStr}
                    onChange={(e) => {
                        setSearchStr(e.target.value);
                    }}
                    autoFocus
                />
                <label htmlFor="search-box" className="fas fa-search"></label>
            </form>
        </>
    );
}
