import { useContext } from "react";
import { context } from "./Utils";

export default function NavBar() {
    const localContext = useContext(context);
    const setCategoryStr = localContext.setCategoryStr;
    const isadmin = localContext.isadmin;

    return (
        <nav className="navbar">
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#products" onClick={() => setCategoryStr("Products")}>
                Products
            </a>
            {isadmin && <a href="#">Category+</a>}
            {isadmin && <a href="#">Product+</a>}
            <a href="#">Contact Us</a>
        </nav>
    );
}
