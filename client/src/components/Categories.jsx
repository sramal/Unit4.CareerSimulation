import { useContext } from "react";
import { context, API_URL, fetchCategories } from "./Utils";

export default function Categories() {
    const localContext = useContext(context);
    const token = localContext.token;
    const categories = localContext.categories;
    const setCategoryStr = localContext.setCategoryStr;
    const isadmin = localContext.isadmin;
    const setCategories = localContext.setCategories;
    const categoryMessage = localContext.categoryMessage;
    const setCategoryMessage = localContext.setCategoryMessage;

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(API_URL + `/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            });

            if (response.ok) {
                fetchCategories(setCategories);
            } else {
                setCategoryMessage({
                    success: false,
                    text: "Delete failed!",
                    id: id,
                });
            }
        } catch (error) {
            setCategoryMessage({
                success: false,
                text: "Delete failed!",
                id: id,
            });
        }
    };

    return (
        <section className="categories" id="categories">
            <h1 className="heading">
                Shop By <span>Categories</span>
            </h1>
            <div className="box-container">
                {categories &&
                    categories.length > 0 &&
                    categories.map((item) => {
                        return (
                            <div key={item.id} className="box">
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>{item.text}</p>
                                {!isadmin && (
                                    <a
                                        href="#products"
                                        className="btn"
                                        onClick={() =>
                                            setCategoryStr(item.name)
                                        }
                                    >
                                        Shop Now
                                    </a>
                                )}
                                {isadmin && (
                                    <a
                                        href="#categories"
                                        className="btn"
                                        onClick={() =>
                                            handleDeleteCategory(item.id)
                                        }
                                    >
                                        Delete
                                    </a>
                                )}
                                {categoryMessage.text !== "" &&
                                    categoryMessage.id === item.id && (
                                        <p>{categoryMessage.text}</p>
                                    )}
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
