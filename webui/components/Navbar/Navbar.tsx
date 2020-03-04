import {FunctionComponent, ReactChild, ReactChildren} from "react";
import * as css from "./navbar.scss"
import exp from "constants";

type NavbarProps = {
    title: string
}
const Navbar: FunctionComponent<NavbarProps> = (props) =><div className={css.navbarContainer}>
    <div className={css.navbar}>
    <p className={css.title}>{props.title}</p>
        <div>
        {props.children}
        </div>
    </div>
</div>;

export default Navbar;