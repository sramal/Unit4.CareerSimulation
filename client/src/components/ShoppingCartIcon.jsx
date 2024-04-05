import { context, fetchShoppingCartItems } from "./Utils";

export default function ShoppingCartIcon() {
    const handleShoppingCartIconClick = () => {
        let loginForm = document.querySelector(".login-form");
        loginForm && loginForm.classList.remove("active");

        let registerForm = document.querySelector(".register-form");
        registerForm && registerForm.classList.remove("active");

        let searchForm = document.querySelector(".search-form");
        searchForm && searchForm.classList.remove("active");

        let menu = document.querySelector(".navbar");
        menu && menu.classList.remove("active");

        let shoppingCart = document.querySelector(".shopping-cart");
        shoppingCart && shoppingCart.classList.toggle("active");

        let addCategoryForm = document.querySelector(".add-category-form");
        addCategoryForm && addCategoryForm.classList.remove("active");

        let addProductForm = document.querySelector(".add-product-form");
        addProductForm && addProductForm.classList.remove("active");
    };

    return (
        <context.Consumer>
            {({ token, shoppingCartId, setShoppingCart }) => {
                return (
                    <div
                        className="fas fa-shopping-cart"
                        id="cart-btn"
                        onClick={(e) => {
                            fetchShoppingCartItems(
                                token,
                                shoppingCartId,
                                setShoppingCart
                            );
                            handleShoppingCartIconClick();
                        }}
                    ></div>
                );
            }}
        </context.Consumer>
    );
}
