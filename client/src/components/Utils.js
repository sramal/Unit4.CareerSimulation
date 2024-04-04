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
