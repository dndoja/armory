import {FunctionComponent, useContext} from "react";
import Drawer, {DrawerType} from "../Drawer/Drawer";
import ModalProps from "../../models/ModalProps";
import RepsWeightField from "./RepsWeightField";
import ProgramBlueprint from "@armory/forge/src/blueprints/ProgramBlueprint";
import ProgramOverviewContext from "../../screens/ProgramOverview/ProgramOverviewContext";
import {List} from "immutable";
import ExerciseBlueprint from "@armory/forge/src/blueprints/ExerciseBlueprint";

class TrainingMaxesDrawerProps implements ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    exerciseBlueprints: List<ExerciseBlueprint>
}

const TrainingMaxesDrawer: FunctionComponent<TrainingMaxesDrawerProps> = (props) => {
    const context = useContext(ProgramOverviewContext);

    return (
        <Drawer {...props} title={"Training maxes"} subtitle={"Enter your best sets or an estimate of them."}
                type={DrawerType.VERTICAL}>
            <div>
            {
                props.exerciseBlueprints.map(blueprint => <RepsWeightField
                    exerciseName={blueprint.name}
                    initialReps={1}
                    initialWeight={blueprint.trainingMax}
                    onChange={repsWeight => context.onTrainingMaxChanged(blueprint, 1, repsWeight[1])}
                    />
                )
            }
            </div>
        </Drawer>
    )
};

export default TrainingMaxesDrawer;