import { context, API_URL } from "./Utils";

export default function Register() {
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
        <context.Consumer>
            {({
                username,
                setUsername,
                password,
                setPassword,
                registerMessage,
                setRegisterMessage,
            }) => {
                return (
                    <form
                        className="register-form"
                        onSubmit={(e) =>
                            handleRegister(
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
            }}
        </context.Consumer>
    );
}
