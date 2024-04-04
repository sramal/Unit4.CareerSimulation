import { context } from "./Utils";

export default function LoginIcon() {
    const handleLoginIconClick = (e, setLoginMessage) => {
        setLoginMessage({});

        let registerForm = document.querySelector(".register-form");
        registerForm && registerForm.classList.remove("active");

        let shoppingCart = document.querySelector(".shopping-cart");
        shoppingCart && shoppingCart.classList.remove("active");

        let searchForm = document.querySelector(".search-form");
        searchForm && searchForm.classList.remove("active");

        let menu = document.querySelector(".navbar");
        menu && menu.classList.remove("active");

        let loginForm = document.querySelector(".login-form");
        loginForm && loginForm.classList.toggle("active");
    };

    return (
        <context.Consumer>
            {({ setLoginMessage }) => {
                return (
                    <div
                        className="fas fa-sign-in"
                        id="login-btn"
                        onClick={(e) =>
                            handleLoginIconClick(e, setLoginMessage)
                        }
                    ></div>
                );
            }}
        </context.Consumer>
    );
}
