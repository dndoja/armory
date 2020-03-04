import {FunctionComponent} from "react";
import * as css from "./drawer.scss";
import ModalProps from "../../models/ModalProps";
import {Scrollbar} from "react-scrollbars-custom";
import {func} from "prop-types";

export enum DrawerType {
    VERTICAL, HORIZONTAL
}
export class DrawerProps implements ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    title?: string;
    subtitle?: string;
    type?: DrawerType
}

function getDrawerClass(type: DrawerType, isOpen: boolean): string {
    if (type === DrawerType.VERTICAL){
        return isOpen === true ? css.verticalOpen : css.verticalClosed;
    }else{
        return isOpen === true ? css.horizontalOpen : css.horizontalClosed;
    }
}

const Drawer: FunctionComponent<DrawerProps> = (props) => {
    const drawerType = props.type ?? DrawerType.VERTICAL;

    return(
        <div className={getDrawerClass(drawerType,props.isOpen)}>
                <div className={css.content}>
                    <div className={css.headerContainer}>
                        <p className={css.title}>{props.title ?? null}</p>
                        <i className={css.closeIcon + " fas fa-times"} onClick={() => props.onRequestClose()}/>
                    </div>
                    <p className={css.subtitle}>{props.subtitle ?? null}</p>

                    <div className={css.innerContent}>
                        <Scrollbar>
                            {props.children}
                        </Scrollbar>
                    </div>
                </div>
        </div>
    )
};

export default Drawer;