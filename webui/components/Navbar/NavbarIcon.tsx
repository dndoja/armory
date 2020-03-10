import styles from "./navbar.module.scss"

type NavbarIconProps = {
    label: string,
    iconName: string,
    onClick: () => void
}

const NavbarIcon = (props: NavbarIconProps) => <i className={"fas " + styles.icon + " " + props.iconName}
                                                  onClick={() => props.onClick()}
>
    <span className={styles.tooltipText}>{props.label}</span>
</i>;

export default NavbarIcon;