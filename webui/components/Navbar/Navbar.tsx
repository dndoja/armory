import {FunctionComponent, ReactChild, ReactChildren} from "react";
import styles from "./navbar.module.scss"
import exp from "constants";

type NavbarProps = {
    title: string
}
const Navbar: FunctionComponent<NavbarProps> = (props) =><div className={styles.navbarContainer}>
    <div className={styles.navbar}>
    <p className={styles.title}>{props.title}</p>
        <div>
        {props.children}
        </div>
    </div>
</div>;

export default Navbar;