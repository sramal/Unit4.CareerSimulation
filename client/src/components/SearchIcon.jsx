import { useContext } from "react";
import { context } from "./Utils";

export default function SearchIcon() {
    const localContext = useContext(context);
    const setCategoryStr = localContext.setCategoryStr;

    const handleSearchIconClick = () => {
        setCategoryStr("Products");

        let shoppingCart = document.querySelector(".shopping-cart");
        shoppingCart && shoppingCart.classList.remove("active");

        let loginForm = document.querySelector(".login-form");
        loginForm && loginForm.classList.remove("active");

        let registerForm = document.querySelector(".register-form");
        registerForm && registerForm.classList.remove("active");

        let menu = document.querySelector("navbar");
        menu && menu.classList.remove("active");

        let searchForm = document.querySelector(".search-form");
        searchForm && searchForm.classList.toggle("active");
    };

    return (
        <a href="#products">
            <div
                className="fas fa-search"
                id="search-btn"
                onClick={handleSearchIconClick}
            ></div>
        </a>
    );
}
