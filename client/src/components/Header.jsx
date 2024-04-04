import { context } from "./Utils";
import NavBar from "./NavBar";
import Icons from "./Icons";
import Search from "./Search";
import ShoppingCart from "./ShoppingCart";
import Logo from "./Logo";
import Login from "./Login";
import Register from "./Register";

export default function Header() {
    return (
        <context.Consumer>
            {({ login, shoppingCart, products }) => {
                return (
                    <header className="header">
                        <Logo />
                        <NavBar />
                        <Icons />
                        <Search />
                        {login && (
                            <ShoppingCart
                                shoppingCart={shoppingCart}
                                products={products}
                            />
                        )}
                        <Login />
                        <Register />
                    </header>
                );
            }}
        </context.Consumer>
    );
}
