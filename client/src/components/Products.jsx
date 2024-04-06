import { useContext, useEffect, useState } from "react";
import {
    context,
    API_URL,
    fetchShoppingCartItems,
    fetchProducts,
} from "./Utils";

export default function Products() {
    const localContext = useContext(context);
    const searchStr = localContext.searchStr;
    const categoryStr = localContext.categoryStr;
    const categories = localContext.categories;
    let products = localContext.products;
    const setProducts = localContext.setProducts;
    const shoppingCartId = localContext.shoppingCartId;
    const setShoppingCart = localContext.setShoppingCart;
    const token = localContext.token;
    const login = localContext.login;
    const isadmin = localContext.isadmin;
    const productMessage = localContext.productMessage;
    const setProductMessage = localContext.setProductMessage;
    const addQuantity = localContext.addQuantity;
    const setAddQuantity = localContext.setAddQuantity;

    if (searchStr !== "") {
        products = products.filter(
            (product) =>
                product.title.toLowerCase().indexOf(searchStr.toLowerCase()) !=
                -1
        );
    } else if (categoryStr !== "Products") {
        const categoryId = categories.find((i) => i.name === categoryStr).id;
        products = products.filter((product) => {
            return product.category_id === categoryId;
        });
    }

    const handleAddToCart = async (product_id, quantity) => {
        try {
            const response = await fetch(
                API_URL + `/api/carts/${shoppingCartId}/products/${product_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({ quantity: quantity }),
                }
            );

            if (response.ok) {
                fetchShoppingCartItems(token, shoppingCartId, setShoppingCart);
                fetchProducts(setProducts);
            }
        } catch (error) {
            console.error("Uh oh, trouble fetching categories!", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(API_URL + `/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            });

            if (response.ok) {
                fetchProducts(setProducts);
            } else {
                setProductMessage({
                    success: false,
                    text: "Delete failed!",
                    id: id,
                });
            }
        } catch (error) {
            setProductMessage({
                success: false,
                text: "Delete failed!",
                id: id,
            });
        }
    };

    return (
        <section className="products" id="products">
            <h1 className="heading">
                <span>{categoryStr}</span>
            </h1>
            <div className="box-container">
                {products &&
                    products.length > 0 &&
                    products.map((item) => {
                        return (
                            <div key={item.id} className="box">
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <div className="price"> ${item.price} </div>
                                {item.quantity < 1 && (
                                    <div className="stock">Out of Stock</div>
                                )}
                                {item.quantity > 0 && (
                                    <div className="stock">
                                        In of Stock({item.quantity})
                                    </div>
                                )}
                                {login &&
                                    !isadmin &&
                                    item.quantity > 0 &&
                                    addQuantity.length > 0 && (
                                        <div>
                                            <input
                                                type="number"
                                                className="add-quantity"
                                                name="addQuantity"
                                                value={
                                                    addQuantity.find(
                                                        (x) => x.id === item.id
                                                    ).quantity
                                                }
                                                min="1"
                                                max={item.quantity}
                                                onChange={(e) => {
                                                    setAddQuantity(
                                                        addQuantity.map((x) => {
                                                            if (
                                                                x.id === item.id
                                                            ) {
                                                                return {
                                                                    quantity:
                                                                        e.target
                                                                            .value,
                                                                    id: item.id,
                                                                };
                                                            } else {
                                                                return x;
                                                            }
                                                        })
                                                    );
                                                }}
                                            />
                                        </div>
                                    )}
                                {login && !isadmin && item.quantity > 0 && (
                                    <a
                                        className="btn"
                                        onClick={async () => {
                                            await handleAddToCart(
                                                item.id,
                                                addQuantity.find(
                                                    (x) => x.id === item.id
                                                ).quantity
                                            );
                                        }}
                                    >
                                        Add To Cart
                                    </a>
                                )}
                                {isadmin && (
                                    <a
                                        href="#products"
                                        className="btn"
                                        onClick={async () =>
                                            await handleDeleteProduct(item.id)
                                        }
                                    >
                                        Delete
                                    </a>
                                )}
                                {productMessage.text !== "" &&
                                    productMessage.id === item.id && (
                                        <p>{productMessage.text}</p>
                                    )}
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
