import {FunctionComponent} from "react";
import Drawer, {DrawerType} from "../Drawer/Drawer";
import ModalProps from "../../models/ModalProps";
import RepsWeightField from "./RepsWeightField";

class TrainingMaxesDrawerProps implements ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

const TrainingMaxesDrawer: FunctionComponent<TrainingMaxesDrawerProps> = (props) => {
    return (
        <Drawer {...props} title={"Training maxes"} subtitle={"Enter your best sets or an estimate of them."} type={DrawerType.VERTICAL}>
            {
                [...Array(20)].map(() => <RepsWeightField exerciseName={"Bulgarian split-squat"} initialReps={4}
                                               initialWeight={124.34}/>)
            }
        </Drawer>
    )
};

export default TrainingMaxesDrawer;