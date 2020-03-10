import {FunctionComponent, useContext} from "react";
import Drawer, {DrawerType} from "../Drawer/Drawer";
import ModalProps from "../../models/ModalProps";
import RepsWeightField from "./RepsWeightField";
import ProgramBlueprint from "@armory/forge/src/blueprints/ProgramBlueprint";
import ProgramOverviewContext from "../../screens/ProgramOverview/ProgramOverviewContext";

class TrainingMaxesDrawerProps implements ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    programBlueprint: ProgramBlueprint
}

const TrainingMaxesDrawer: FunctionComponent<TrainingMaxesDrawerProps> = (props) => {
    const context = useContext(ProgramOverviewContext);

    return (
        <Drawer {...props} title={"Training maxes"} subtitle={"Enter your best sets or an estimate of them."}
                type={DrawerType.VERTICAL}>
            {
                props.programBlueprint.getExerciseBlueprints().map(blueprint => <RepsWeightField
                    exerciseName={blueprint.name}
                    initialReps={1}
                    initialWeight={blueprint.trainingMax}
                    onChange={repsWeight => context.onTrainingMaxChanged(blueprint, 1, repsWeight[1])}
                    />
                )
            }
        </Drawer>
    )
};

export default TrainingMaxesDrawer;