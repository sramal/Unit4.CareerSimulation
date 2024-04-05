import { context, API_URL } from "./Utils";

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
        setShoppingCart
    ) {
        e.preventDefault();

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

                let loginForm = document.querySelector(".login-form");
                loginForm.classList.remove("active");
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
                                setShoppingCart
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
