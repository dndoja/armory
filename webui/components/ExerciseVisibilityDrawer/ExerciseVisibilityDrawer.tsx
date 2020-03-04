import {FunctionComponent, useContext, useState} from "react";
import Drawer, {DrawerType} from "../Drawer/Drawer";
import ModalProps from "../../types/ModalProps";
import VisibilityToggle from "./VisibilityToggle/VisibilityToggle";
import ProgramOverviewContext from "../../screens/ProgramOverview/ProgramOverviewContext";
import WorkoutProgram from "../../types/WorkoutProgram";
import CollapsableSection from "../CollapsableSection/CollapsableSection";
import * as css from "./exercise_visibility_drawer.scss"

class TrainingMaxesDrawerProps implements ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    program: WorkoutProgram
}

const ExerciseVisibilityDrawer: FunctionComponent<TrainingMaxesDrawerProps> = (props) => {
    const context = useContext(ProgramOverviewContext);

    const visibilityMap = context.exerciseVisibilityMap;

    return (
        <Drawer {...props} title={"Exercise visibility"} subtitle={"Hide/show exercises"} type={DrawerType.HORIZONTAL}>
            <div style={{width:'100%'}}>

                {
                    props.program.blocks.map((block,blockIndex) => {
                        return (
                            <CollapsableSection title={'Block ' + (blockIndex + 1)}>
                                <div className={css.content}>
                                {
                                    block.weeks[0].workouts.map((workout, index) => {
                                        return (
                                            <div className={css.column}>
                                                <p className={css.dayLabel}>Day {index + 1}</p>
                                                {
                                                    workout.exercises.map(exercise => <VisibilityToggle
                                                        key={exercise.id}
                                                        toggledOn={visibilityMap[exercise.id].visible}
                                                        label={exercise.name}
                                                        onChange={value => context.onExerciseVisibilityChanged(exercise.id, value)}
                                                    />)
                                                }
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </CollapsableSection>
                        )
                    })
                }
            </div>
        </Drawer>
    )
};

export default ExerciseVisibilityDrawer;