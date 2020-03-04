import * as css from "./visibility_toggle.scss"
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
        <div className={css.container}>
            {
                props.toggledOn ?
                    <i className={css.icon + " " + css.toggledOn + " fas fa-eye"} onClick={onToggleClicked}/>
                    :
                    <i className={css.icon + " " + css.toggledOff + " fas fa-eye-slash"} onClick={onToggleClicked}/>
            }
            <p className={props.toggledOn ? css.toggledOn : css.toggledOff}>{props.label}</p>
        </div>
    );
};

export default VisibilityToggle;