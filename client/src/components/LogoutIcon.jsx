import { context } from "./Utils";

export default function LogoutIcon() {
    const handleLogoutIconClick = (e, setLogin, setIsadmin, setToken) => {
        setLogin(false);
        setIsadmin(false);
        setToken("");

        let registerForm = document.querySelector(".register-form");
        registerForm && registerForm.classList.remove("active");

        let shoppingCart = document.querySelector(".shopping-cart");
        shoppingCart && shoppingCart.classList.remove("active");

        let searchForm = document.querySelector(".search-form");
        searchForm && searchForm.classList.remove("active");

        let menu = document.querySelector(".navbar");
        menu && menu.classList.remove("active");

        let loginForm = document.querySelector(".login-form");
        loginForm && loginForm.classList.remove("active");
    };

    return (
        <context.Consumer>
            {({ setLogin, setIsadmin, setToken }) => {
                return (
                    <div
                        className="fas fa-sign-out"
                        id="logout-btn"
                        onClick={(e) =>
                            handleLogoutIconClick(
                                e,
                                setLogin,
                                setIsadmin,
                                setToken
                            )
                        }
                    ></div>
                );
            }}
        </context.Consumer>
    );
}
