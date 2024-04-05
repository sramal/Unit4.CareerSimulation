export default function MenuIcon() {
    const handleMenuIconClick = () => {
        let loginForm = document.querySelector(".login-form");
        loginForm && loginForm.classList.remove("active");

        let registerForm = document.querySelector(".register-form");
        registerForm && registerForm.classList.remove("active");

        let searchForm = document.querySelector(".search-form");
        searchForm && searchForm.classList.remove("active");

        let shoppingCart = document.querySelector(".shopping-cart");
        shoppingCart && shoppingCart.classList.remove("active");

        let navbar = document.querySelector(".navbar");
        navbar && navbar.classList.toggle("active");

        let addCategoryForm = document.querySelector(".add-category-form");
        addCategoryForm && addCategoryForm.classList.remove("active");

        let addProductForm = document.querySelector(".add-product-form");
        addProductForm && addProductForm.classList.remove("active");
    };

    return (
        <div
            className="fas fa-bars"
            id="menu-btn"
            onClick={handleMenuIconClick}
        ></div>
    );
}
