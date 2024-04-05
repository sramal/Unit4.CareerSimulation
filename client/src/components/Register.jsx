import { useContext } from "react";
import { context, API_URL } from "./Utils";

export default function Register() {
    const localContext = useContext(context);
    const username = localContext.username;
    const setUsername = localContext.setUsername;
    const password = localContext.password;
    const setPassword = localContext.setPassword;
    const registerMessage = localContext.registerMessage;
    const setRegisterMessage = localContext.setRegisterMessage;

    async function handleRegister(
        e,
        username,
        setUsername,
        password,
        setPassword,
        setRegisterMessage
    ) {
        e.preventDefault();

        try {
            const user = { username: username, password: password };

            const response = await fetch(API_URL + "/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            setRegisterMessage({
                success: true,
                text: "Registration successfull!",
            });
            if (response.status !== 200) {
                setRegisterMessage({
                    success: false,
                    text: "Registration failed!",
                });
            }
        } catch (error) {
            setRegisterMessage({
                success: false,
                text: "Registration failed!",
            });
        } finally {
            setUsername("");
            setPassword("");
        }
    }

    return (
        <form
            className="register-form"
            onSubmit={async (e) =>
                await handleRegister(
                    e,
                    username,
                    setUsername,
                    password,
                    setPassword,
                    setRegisterMessage
                )
            }
        >
            <h3>Register</h3>
            <input
                type="text"
                placeholder="user name"
                className="box"
                name="username"
                id="register-username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                required
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
            <p>{registerMessage.text}</p>
            <input type="submit" value="Register" className="btn" />
        </form>
    );
}
