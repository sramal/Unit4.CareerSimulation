import { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import { context, fetchProducts, fetchCategories } from "./components/Utils";

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
    const [addQuantity, setAddQuantity] = useState([]);
    const [searchStr, setSearchStr] = useState("");
    const [categoryStr, setCategoryStr] = useState("Products");
    const [categoryMessage, setCategoryMessage] = useState({});
    const [productMessage, setProductMessage] = useState({});

    useEffect(() => {
        fetchCategories(setCategories);
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
                categoryMessage,
                setCategoryMessage,
                productMessage,
                setProductMessage,
                addQuantity,
                setAddQuantity,
            }}
        >
            {/* <Routes>
                <Route path="/" element={<LandingPage />}></Route>
            </Routes> */}
            <LandingPage />
        </context.Provider>
    );
}

export default App;
