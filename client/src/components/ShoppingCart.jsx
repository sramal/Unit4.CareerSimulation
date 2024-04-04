import {
    API_URL,
    context,
    fetchProducts,
    fetchShoppingCartItems,
} from "./Utils";
import { useContext } from "react";

export default function ShoppingCart() {
    const localContext = useContext(context);
    const token = localContext.token;
    const shoppingCartId = localContext.shoppingCartId;
    const shoppingCart = localContext.shoppingCart;
    const setShoppingCart = localContext.setShoppingCart;
    const products = localContext.products;
    const setProducts = localContext.setProducts;

    const handleDeleteCartItem = async (product_id) => {
        try {
            await fetch(
                API_URL + `/api/carts/${shoppingCartId}/products/${product_id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                }
            );

            await fetchShoppingCartItems(
                token,
                shoppingCartId,
                setShoppingCart
            );

            await fetchProducts(setProducts);
        } catch (error) {
            console.error("Uh oh, trouble fetching categories!", error);
        }
    };

    const handleCheckout = async () => {
        try {
            await fetch(API_URL + `/api/carts/${shoppingCartId}/checkout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify({ cart_items: shoppingCart }),
            });

            await fetchShoppingCartItems(
                token,
                shoppingCartId,
                setShoppingCart
            );

            await fetchProducts(setProducts);
        } catch (error) {
            console.error("Uh oh, trouble fetching categories!", error);
        }
    };

    let total = 0.0;
    return (
        <div className="shopping-cart">
            {shoppingCart &&
                shoppingCart.length > 0 &&
                shoppingCart.map((item) => {
                    const product = products.find(
                        (i) => i.id === item.product_id
                    );
                    total += item.quantity * product.price;
                    return (
                        <div key={item.id} className="box">
                            <i
                                className="fas fa-trash"
                                onClick={() => {
                                    handleDeleteCartItem(item.product_id);
                                }}
                            ></i>
                            <img src={product.image} alt={product.title} />
                            <div className="content">
                                <h3>{product.title}</h3>
                                <span className="price">${product.price}</span>
                                <span className="quantity">
                                    Qty : {item.quantity}
                                </span>
                            </div>
                        </div>
                    );
                })}

            {shoppingCart && shoppingCart.length > 0 && (
                <>
                    <div className="total">
                        Total : ${parseFloat(total).toFixed(2)}{" "}
                    </div>
                    <a
                        className="btn"
                        onClick={() => {
                            handleCheckout();
                        }}
                    >
                        Checkout
                    </a>
                </>
            )}

            {shoppingCart && shoppingCart.length === 0 && (
                <div className="total">Empty Cart</div>
            )}
        </div>
    );
}
