import { useContext } from "react";
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

    const handleAddToCart = async (product_id) => {
        try {
            const response = await fetch(
                API_URL + `/api/carts/${shoppingCartId}/products/${product_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({ quantity: 1 }),
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
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                {item.quantity < 1 && (
                                    <div className="stock">Out of Stock</div>
                                )}
                                {item.quantity > 0 && (
                                    <div className="stock">
                                        In of Stock({item.quantity})
                                    </div>
                                )}
                                {login && item.quantity > 0 && (
                                    <a
                                        className="btn"
                                        onClick={(e) => {
                                            handleAddToCart(item.id);
                                        }}
                                    >
                                        Add To Cart
                                    </a>
                                )}
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
