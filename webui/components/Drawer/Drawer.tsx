import {FunctionComponent} from "react";
import styles from "./drawer.module.scss";
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
        return isOpen === true ? styles.verticalOpen : styles.verticalClosed;
    }else{
        return isOpen === true ? styles.horizontalOpen : styles.horizontalClosed;
    }
}

const Drawer: FunctionComponent<DrawerProps> = (props) => {
    const drawerType = props.type ?? DrawerType.VERTICAL;

    return(
        <div className={getDrawerClass(drawerType,props.isOpen)}>
                <div className={styles.content}>
                    <div className={styles.headerContainer}>
                        <p className={styles.title}>{props.title ?? null}</p>
                        <i className={styles.closeIcon + " fas fa-times"} onClick={() => props.onRequestClose()}/>
                    </div>
                    <p className={styles.subtitle}>{props.subtitle ?? null}</p>

                    <div className={styles.innerContent}>
                        <Scrollbar>
                            {props.children}
                        </Scrollbar>
                    </div>
                </div>
        </div>
    )
};

export default Drawer;