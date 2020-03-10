import {FunctionComponent, useContext} from "react";
import Drawer, {DrawerType} from "../Drawer/Drawer";
import ModalProps from "../../models/ModalProps";
import VisibilityToggle from "./VisibilityToggle/VisibilityToggle";
import ProgramOverviewContext from "../../screens/ProgramOverview/ProgramOverviewContext";
import Section from "../Section/Section";
import styles from "./exercise_visibility_drawer.module.scss"
import ProgramBlueprint from "@armory/forge/src/blueprints/ProgramBlueprint";

class TrainingMaxesDrawerProps implements ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    program: ProgramBlueprint
}

const ExerciseVisibilityDrawer: FunctionComponent<TrainingMaxesDrawerProps> = (props) => {
    const context = useContext(ProgramOverviewContext);
    const visibilityMap = context.exerciseVisibilityMap;
    const blocks = props.program.blocks;

    return (
        <Drawer {...props} title={"Exercise visibility"} subtitle={"Hide/show exercises"} type={DrawerType.HORIZONTAL}>
            <div style={{width: '100%'}}>
                {
                    blocks.map((block, blockIndex) => {
                        return (
                            <Section title={blocks.size > 1 ? 'Block ' + (blockIndex + 1) : undefined}>
                                <div className={styles.content}>
                                    {
                                        block.getExercisesByDays().valueSeq().map((exercises, day) => <div className={styles.column}>
                                            <p className={styles.dayLabel}>Day {day + 1}</p>
                                            <div>
                                            {
                                                exercises.map(exercise => <VisibilityToggle
                                                    key={exercise.id}
                                                    toggledOn={visibilityMap[exercise.id].visible}
                                                    label={exercise.name}
                                                    onChange={value => context.onExerciseVisibilityChanged(exercise.id, value)}
                                                />)
                                            }
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </Section>
                        )
                    })
                }
            </div>
        </Drawer>
    )
};

export default ExerciseVisibilityDrawer;