import { useContext } from "react";
import { context } from "./Utils";

export default function Categories() {
    const localContext = useContext(context);
    const categories = localContext.categories;
    const setCategoryStr = localContext.setCategoryStr;

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
                                <a
                                    href="#products"
                                    className="btn"
                                    onClick={() => setCategoryStr(item.name)}
                                >
                                    Shop Now
                                </a>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
