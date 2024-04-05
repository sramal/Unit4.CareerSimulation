import { useContext } from "react";
import { context } from "./Utils";
import NavBar from "./NavBar";
import Icons from "./Icons";
import Search from "./Search";
import ShoppingCart from "./ShoppingCart";
import Logo from "./Logo";
import Login from "./Login";
import Register from "./Register";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";

export default function Header() {
    const localContext = useContext(context);
    const login = localContext.login;
    const isadmin = localContext.isadmin;

    return (
        <header className="header">
            <Logo />
            <NavBar />
            <Icons />
            <Search />
            {login && <ShoppingCart />}
            <Login />
            <Register />
            {isadmin && <AddCategory />}
            {isadmin && <AddProduct />}
        </header>
    );
}
