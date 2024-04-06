import {
    context,
    API_URL,
    fetchProducts,
    fetchCategories,
    toggleForm,
} from "./Utils";

export default function Login() {
    async function handleLogin(
        e,
        username,
        setUsername,
        password,
        setPassword,
        setLogin,
        setToken,
        isadmin,
        setIsadmin,
        setLoginMessage,
        setShoppingCartId,
        setShoppingCart,
        setCategories,
        products,
        setProducts,
        addQuantity,
        setAddQuantity,
        setRegisterMessage,
        setCategoryMessage,
        setProductMessage,
        setSearchStr,
        setCategoryStr
    ) {
        e.preventDefault();

        const intializeAddQuantity = (
            products,
            addQuantity,
            setAddQuantity
        ) => {
            const arr = [];
            products.forEach((x) => {
                arr.push({ quantity: 1, id: x.id });
            });

            setAddQuantity(arr);
        };

        try {
            const user = { username: username, password: password };

            const response = await fetch(API_URL + "/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const json = await response.json();
            if (response.status !== 200) {
                setLoginMessage({
                    success: false,
                    text: "Login failed!",
                });
            } else {
                setToken(json.token);
                setIsadmin(json.isadmin);
                setShoppingCartId(json.cart_id);
                setShoppingCart(json.cart_items);
                setLogin(true);
                setLoginMessage({
                    success: true,
                    text: "Login successfull!",
                });
                setRegisterMessage({});
                setCategoryMessage({});
                setProductMessage({});
                setSearchStr("");
                setCategoryStr("Products");
                fetchProducts(setProducts);
                fetchCategories(setCategories);
                if (products.length > 0) {
                    intializeAddQuantity(products, addQuantity, setAddQuantity);
                }

                toggleForm("");
            }
        } catch (error) {
            setLoginMessage({
                success: false,
                text: "Login failed!",
            });
        } finally {
            setUsername("");
            setPassword("");
        }
    }

    return (
        <context.Consumer>
            {({
                username,
                setUsername,
                password,
                setPassword,
                setLogin,
                setToken,
                isadmin,
                setIsadmin,
                loginMessage,
                setLoginMessage,
                setShoppingCartId,
                setShoppingCart,
                setCategories,
                products,
                setProducts,
                addQuantity,
                setAddQuantity,
                setRegisterMessage,
                setCategoryMessage,
                setProductMessage,
                setSearchStr,
                setCategoryStr,
            }) => {
                return (
                    <form
                        action=""
                        className="login-form"
                        onSubmit={async (e) =>
                            await handleLogin(
                                e,
                                username,
                                setUsername,
                                password,
                                setPassword,
                                setLogin,
                                setToken,
                                isadmin,
                                setIsadmin,
                                setLoginMessage,
                                setShoppingCartId,
                                setShoppingCart,
                                setCategories,
                                products,
                                setProducts,
                                addQuantity,
                                setAddQuantity,
                                setRegisterMessage,
                                setCategoryMessage,
                                setProductMessage,
                                setSearchStr,
                                setCategoryStr
                            )
                        }
                    >
                        <h3>Login</h3>
                        <input
                            type="text"
                            placeholder="user name"
                            className="box"
                            name="username"
                            id="login-username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="box"
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                        <p>{loginMessage.text}</p>
                        <input type="submit" value="Login" className="btn" />
                    </form>
                );
            }}
        </context.Consumer>
    );
}
