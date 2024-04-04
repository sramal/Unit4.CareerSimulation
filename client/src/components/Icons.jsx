import { context } from "./Utils";

import LoginIcon from "./LoginIcon";
import MenuIcon from "./MenuIcon";
import SearchIcon from "./SearchIcon";
import ShoppingCartIcon from "./ShoppingCartIcon";
import RegisterIcon from "./RegisterIcon";
import LogoutIcon from "./LogoutIcon";

export default function Icons() {
    return (
        <context.Consumer>
            {({ login }) => {
                return (
                    <div className="icons">
                        <MenuIcon />
                        <SearchIcon />
                        {login && <ShoppingCartIcon />}
                        {!login && <LoginIcon />}
                        {!login && <RegisterIcon />}
                        {login && <LogoutIcon />}
                    </div>
                );
            }}
        </context.Consumer>
    );
}
