import React from "react";

export const API_URL = "http://localhost:3000";
export const context = React.createContext(null);

export const fetchProducts = async (setProducts) => {
    try {
        const response = await fetch(API_URL + "/api/products");
        const json = await response.json();
        setProducts(json.products);
    } catch (error) {
        console.error("Uh oh, trouble fetching products!", error);
    }
};

export const fetchShoppingCartItems = async (
    token,
    shoppingCartId,
    setShoppingCart
) => {
    try {
        const response = await fetch(API_URL + `/api/carts/${shoppingCartId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        });
        const json = await response.json();
        setShoppingCart(json.cart_items);
    } catch (error) {
        console.error("Uh oh, trouble fetching shopping cart items!", error);
    }
};

export const fetchCategories = async (setCategories) => {
    try {
        const response = await fetch(API_URL + "/api/categories");
        const json = await response.json();
        setCategories(json.categories);
    } catch (error) {
        console.error("Uh oh, trouble fetching categories!", error);
    }
};

export const toggleForm = (name) => {
    if (name) {
        const formHandle = document.querySelector(name);
        formHandle && formHandle.classList.toggle("active");
    }

    const registerForm = document.querySelector(".register-form");
    if (name !== ".register-form") {
        registerForm && registerForm.classList.remove("active");
    } else {
        registerForm && document.getElementById("register-username").focus();
    }

    const loginForm = document.querySelector(".login-form");
    if (name !== ".login-form") {
        loginForm && loginForm.classList.remove("active");
    } else {
        loginForm && document.getElementById("login-username").focus();
    }

    if (name !== ".shopping-cart") {
        const shoppingCart = document.querySelector(".shopping-cart");
        shoppingCart && shoppingCart.classList.remove("active");
    }

    const searchForm = document.querySelector(".search-form");
    if (name !== ".search-form") {
        searchForm && searchForm.classList.remove("active");
    } else {
        searchForm && document.getElementById("search-box").focus();
    }

    const menu = document.querySelector(".navbar");
    if (name !== ".navbar") {
        menu && menu.classList.remove("active");
    }

    const addCategoryForm = document.querySelector(".add-category-form");
    if (name !== ".add-category-form") {
        addCategoryForm && addCategoryForm.classList.remove("active");
    } else {
        addCategoryForm && document.getElementById("category-name").focus();
    }

    const addProductForm = document.querySelector(".add-product-form");
    if (name !== ".add-product-form") {
        addProductForm && addProductForm.classList.remove("active");
    } else {
        addProductForm && document.getElementById("product-title").focus();
    }
};
