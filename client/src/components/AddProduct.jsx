import { useState, useContext } from "react";
import { context, API_URL, fetchProducts } from "./Utils";

export default function AddProduct() {
    const [productTitle, setProductTitle] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productImage, setProductImage] = useState("");

    const localContext = useContext(context);
    const setProducts = localContext.setProducts;
    const productMessage = localContext.productMessage;
    const setProductMessage = localContext.setProductMessage;
    const token = localContext.token;

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_URL + `/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify({
                    title: productTitle,
                    category: categoryName,
                    price: parseFloat(productPrice),
                    quantity: parseInt(productQuantity),
                    image: productImage,
                }),
            });

            if (response.ok) {
                setProductMessage({
                    success: true,
                    text: "Product added successfully!",
                    id: "",
                });
                await fetchProducts(setProducts);
            } else {
                setProductMessage({
                    success: false,
                    text: "Add Product failed!",
                    id: "",
                });
            }
        } catch (error) {
            setProductMessage({
                success: false,
                text: "Add Product failed!",
                id: "",
            });
        } finally {
            setProductTitle("");
            setProductPrice(0);
            setProductQuantity(0);
            setProductImage("");
        }
    };

    return (
        <form
            action=""
            className="add-product-form"
            onSubmit={(e) => handleAddProduct(e)}
        >
            <h3>New Product</h3>
            <input
                type="text"
                placeholder="product name"
                className="box"
                name="productTitle"
                id="product-title"
                value={productTitle}
                onChange={(e) => {
                    setProductTitle(e.target.value);
                }}
                required
            />
            <input
                type="text"
                placeholder="product category"
                className="box"
                name="categoryName"
                value={categoryName}
                onChange={(e) => {
                    setCategoryName(e.target.value);
                }}
                required
            />
            <input
                type="text"
                placeholder="price"
                className="box"
                name="productPrice"
                value={productPrice}
                onChange={(e) => {
                    setProductPrice(e.target.value);
                }}
                required
            />
            <input
                type="text"
                placeholder="quantity"
                className="box"
                name="productQuantity"
                value={productQuantity}
                onChange={(e) => {
                    setProductQuantity(e.target.value);
                }}
                required
            />
            <input
                type="text"
                placeholder="image location"
                className="box"
                name="productImage"
                value={productImage}
                onChange={(e) => {
                    setProductImage(e.target.value);
                }}
                required
            />
            {productMessage.text !== "" && <p>{productMessage.text}</p>}
            <input type="submit" value="Add" className="btn" />
        </form>
    );
}
