import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import { context, API_URL, fetchProducts } from "./components/Utils";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState("");
    const [isadmin, setIsadmin] = useState(false);
    const [registerMessage, setRegisterMessage] = useState({});
    const [loginMessage, setLoginMessage] = useState({});
    const [shoppingCart, setShoppingCart] = useState([]);
    const [shoppingCartId, setShoppingCartId] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchStr, setSearchStr] = useState("");
    const [categoryStr, setCategoryStr] = useState("Products");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL + "/api/categories");
                const json = await response.json();
                setCategories(json.categories);
            } catch (error) {
                console.error("Uh oh, trouble fetching categories!", error);
            }
        };

        fetchCategories();
        fetchProducts(setProducts);
    }, []);

    return (
        <context.Provider
            value={{
                username,
                setUsername,
                password,
                setPassword,
                login,
                setLogin,
                token,
                setToken,
                isadmin,
                setIsadmin,
                registerMessage,
                setRegisterMessage,
                loginMessage,
                setLoginMessage,
                shoppingCartId,
                setShoppingCartId,
                shoppingCart,
                setShoppingCart,
                categories,
                setCategories,
                products,
                setProducts,
                searchStr,
                setSearchStr,
                categoryStr,
                setCategoryStr,
            }}
        >
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
            </Routes>
        </context.Provider>
    );
}

export default App;
