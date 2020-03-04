import * as css from "./navbar.scss"

type NavbarIconProps = {
    label: string,
    iconName: string,
    onClick: () => void
}

const NavbarIcon = (props: NavbarIconProps) => <i className={"fas " + css.icon + " " + props.iconName}
                                                  onClick={() => props.onClick()}
>
    <span className={css.tooltipText}>{props.label}</span>
</i>;

export default NavbarIcon;