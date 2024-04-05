import { useContext } from "react";
import { context, toggleForm } from "./Utils";

export default function NavBar() {
    const localContext = useContext(context);
    const setCategoryStr = localContext.setCategoryStr;
    const isadmin = localContext.isadmin;
    const setCategoryMessage = localContext.setCategoryMessage;
    const setProductMessage = localContext.setProductMessage;

    const handleProductsClick = (setCategoryStr) => {
        setCategoryStr("Products");

        toggleForm("");
    };

    const handleAddCategoryClick = (setCategoryMessage) => {
        setCategoryMessage({});

        toggleForm(".add-category-form");
    };

    const handleAddProductClick = (setProductMessage) => {
        setProductMessage({});

        toggleForm(".add-product-form");
    };

    return (
        <nav className="navbar">
            <a href="#home" onClick={() => toggleForm("")}>
                Home
            </a>
            <a href="#categories" onClick={() => toggleForm("")}>
                Categories
            </a>
            <a
                href="#products"
                onClick={() => handleProductsClick(setCategoryStr)}
            >
                Products
            </a>
            {isadmin && (
                <a
                    href="#categories"
                    onClick={() => handleAddCategoryClick(setCategoryMessage)}
                >
                    Category<sup>+</sup>
                </a>
            )}
            {isadmin && (
                <a
                    href="#products"
                    onClick={() => handleAddProductClick(setProductMessage)}
                >
                    Product<sup>+</sup>
                </a>
            )}
        </nav>
    );
}
