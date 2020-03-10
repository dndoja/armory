import styles from "./visibility_toggle.module.scss"
import {useEffect, useState} from "react";
import {func} from "prop-types";

type VisibilityToggleProps = {
    toggledOn: boolean,
    label: string,
    onChange?: (boolean) => void
}

function getIcon(toggledOn: boolean) {
    return toggledOn ? "fa-eye" : "fa-eye-slash";
}


const VisibilityToggle = (props: VisibilityToggleProps) => {
    function onToggleClicked() {
        props.onChange && props.onChange(!props.toggledOn)
    }

    return (
        <div className={styles.container}>
            {
                props.toggledOn ?
                    <i className={styles.icon + " " + styles.toggledOn + " fas fa-eye"} onClick={onToggleClicked}/>
                    :
                    <i className={styles.icon + " " + styles.toggledOff + " fas fa-eye-slash"} onClick={onToggleClicked}/>
            }
            <p className={props.toggledOn ? styles.toggledOn : styles.toggledOff}>{props.label}</p>
        </div>
    );
};

export default VisibilityToggle;