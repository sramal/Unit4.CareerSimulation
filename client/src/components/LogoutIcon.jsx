import { useContext } from "react";
import { context, toggleForm, fetchProducts } from "./Utils";

export default function LogoutIcon() {
    const localContext = useContext(context);
    const setLogin = localContext.setLogin;
    const setIsadmin = localContext.setIsadmin;
    const setToken = localContext.setToken;
    const setRegisterMessage = localContext.setRegisterMessage;
    const setCategoryMessage = localContext.setCategoryMessage;
    const setProductMessage = localContext.setProductMessage;
    const setSearchStr = localContext.setSearchStr;
    const setCategoryStr = localContext.setCategoryStr;
    const setProducts = localContext.setProducts;

    const handleLogoutIconClick = () => {
        setLogin(false);
        setIsadmin(false);
        setToken("");
        setRegisterMessage({});
        setCategoryMessage({});
        setProductMessage({});
        setSearchStr("");
        setCategoryStr("Products");
        fetchProducts(setProducts);

        toggleForm("");
    };

    return (
        <div
            className="fas fa-sign-out"
            id="logout-btn"
            onClick={() => handleLogoutIconClick()}
        ></div>
    );
}
