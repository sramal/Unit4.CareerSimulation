import { useContext } from "react";
import { context, fetchShoppingCartItems, toggleForm } from "./Utils";

export default function ShoppingCartIcon() {
    const localContext = useContext(context);
    const token = localContext.token;
    const shoppingCartId = localContext.shoppingCartId;
    const setShoppingCart = localContext.setShoppingCart;

    return (
        <div
            className="fas fa-shopping-cart"
            id="cart-btn"
            onClick={async () => {
                await fetchShoppingCartItems(
                    token,
                    shoppingCartId,
                    setShoppingCart
                );
                toggleForm(".shopping-cart");
            }}
        ></div>
    );
}
