import { useContext } from "react";
import { context } from "./Utils";

export default function NavBar() {
    const localContext = useContext(context);
    const setCategoryStr = localContext.setCategoryStr;
    const isadmin = localContext.isadmin;
    const setCategoryMessage = localContext.setCategoryMessage;
    const setProductMessage = localContext.setProductMessage;

    const handleAddCategoryClick = (setCategoryMessage) => {
        setCategoryMessage({});

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

        let addCategoryForm = document.querySelector(".add-category-form");
        addCategoryForm && addCategoryForm.classList.toggle("active");

        let addProductForm = document.querySelector(".add-product-form");
        addProductForm && addProductForm.classList.remove("active");
    };

    const handleAddProductClick = (setProductMessage) => {
        setProductMessage({});

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

        let addCategoryForm = document.querySelector(".add-category-form");
        addCategoryForm && addCategoryForm.classList.remove("active");

        let addProductForm = document.querySelector(".add-product-form");
        addProductForm && addProductForm.classList.toggle("active");
    };

    return (
        <nav className="navbar">
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#products" onClick={() => setCategoryStr("Products")}>
                Products
            </a>
            {isadmin && (
                <a
                    href="#categories"
                    onClick={() => handleAddCategoryClick(setCategoryMessage)}
                >
                    Category+
                </a>
            )}
            {isadmin && (
                <a
                    href="#products"
                    onClick={() => handleAddProductClick(setProductMessage)}
                >
                    Product+
                </a>
            )}
            <a href="#">Contact Us</a>
        </nav>
    );
}
