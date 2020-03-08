import {FunctionComponent, useContext, useState} from "react";
import Drawer, {DrawerType} from "../Drawer/Drawer";
import ModalProps from "../../models/ModalProps";
import VisibilityToggle from "./VisibilityToggle/VisibilityToggle";
import ProgramOverviewContext from "../../screens/ProgramOverview/ProgramOverviewContext";
import Section from "../Section/Section";
import * as css from "./exercise_visibility_drawer.scss"
import {ForgedProgram} from "@armory/forge/src/forged/ForgedProgram";

class TrainingMaxesDrawerProps implements ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    program: ForgedProgram
}

const ExerciseVisibilityDrawer: FunctionComponent<TrainingMaxesDrawerProps> = (props) => {
    const context = useContext(ProgramOverviewContext);
    const visibilityMap = context.exerciseVisibilityMap;
    const blocks = props.program.blocks;

    return (
        <Drawer {...props} title={"Exercise visibility"} subtitle={"Hide/show exercises"} type={DrawerType.HORIZONTAL}>
            <div style={{width:'100%'}}>
                {
                    blocks.map((block,blockIndex) => {
                        return (
                            <Section title={blocks.length > 1 ? 'Block ' + (blockIndex + 1) : undefined}>
                                <div className={css.content}>
                                {
                                    block.weeks[0].days.map((workout, index) => {
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
                            </Section>
                        )
                    })
                }
            </div>
        </Drawer>
    )
};

export default ExerciseVisibilityDrawer;