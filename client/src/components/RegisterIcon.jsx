import { context } from "./Utils";

export default function RegisterIcon() {
    const handleRegisterIconClick = (e, setRegisterMessage) => {
        setRegisterMessage({});

        let shoppingCart = document.querySelector(".shopping-cart");
        shoppingCart.classList.remove("active");

        let searchForm = document.querySelector(".search-form");
        searchForm.classList.remove("active");

        let menu = document.querySelector(".navbar");
        menu.classList.remove("active");

        let loginForm = document.querySelector(".login-form");
        loginForm.classList.remove("active");

        let registerForm = document.querySelector(".register-form");
        registerForm.classList.toggle("active");
    };

    return (
        <context.Consumer>
            {({ setRegisterMessage }) => {
                return (
                    <div
                        className="fas fa-user-plus"
                        id="register-btn"
                        onClick={(e) =>
                            handleRegisterIconClick(e, setRegisterMessage)
                        }
                    ></div>
                );
            }}
        </context.Consumer>
    );
}
