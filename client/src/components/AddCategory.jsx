import { useState, useContext } from "react";
import { context, API_URL, fetchCategories } from "./Utils";

export default function AddCategory() {
    const [categoryName, setCategoryName] = useState("");
    const [categoryText, setCategoryText] = useState("");
    const [categoryImage, setCategoryImage] = useState("");

    const localContext = useContext(context);
    const setCategories = localContext.setCategories;
    const categoryMessage = localContext.categoryMessage;
    const setCategoryMessage = localContext.setCategoryMessage;
    const token = localContext.token;

    const handleAddCategory = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_URL + `/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                body: JSON.stringify({
                    name: categoryName,
                    text: categoryText,
                    image: categoryImage,
                }),
            });

            if (response.ok) {
                setCategoryMessage({
                    success: true,
                    text: "Category added successfully!",
                    id: "",
                });
                await fetchCategories(setCategories);
            } else {
                setCategoryMessage({
                    success: false,
                    text: "Add Category failed!",
                    id: "",
                });
            }
        } catch (error) {
            setCategoryMessage({
                success: false,
                text: "Add Category failed!",
                id: "",
            });
        } finally {
            setCategoryName("");
            setCategoryText("");
            setCategoryImage("");
        }
    };

    return (
        <form
            action=""
            className="add-category-form"
            onSubmit={async (e) => await handleAddCategory(e)}
        >
            <h3>New Category</h3>
            <input
                type="text"
                placeholder="category name"
                className="box"
                name="categoryName"
                id="category-name"
                value={categoryName}
                onChange={(e) => {
                    setCategoryName(e.target.value);
                }}
                required
            />
            <input
                type="text"
                placeholder="category text"
                className="box"
                name="categoryText"
                value={categoryText}
                onChange={(e) => {
                    setCategoryText(e.target.value);
                }}
                required
            />
            <input
                type="text"
                placeholder="image location"
                className="box"
                name="categoryImage"
                value={categoryImage}
                onChange={(e) => {
                    setCategoryImage(e.target.value);
                }}
                required
            />
            {categoryMessage.text !== "" && <p>{categoryMessage.text}</p>}
            <input type="submit" value="Add" className="btn" />
        </form>
    );
}
