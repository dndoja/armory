import * as css from "./workout_card.scss";
import SetBubble from "../SetBubble/SetBubble";
import {useContext} from "react";
import ProgramOverviewContext from "../../screens/ProgramOverview/ProgramOverviewContext";
import ForgedExercise from "@armory/forge/src/forged/ForgedExercise";

type WorkoutCardRowProps = {
    exercise: ForgedExercise,
}

const WorkoutCardRow = (props: WorkoutCardRowProps) => {
    const context = useContext(ProgramOverviewContext);
    const visibilityMap = context.exerciseVisibilityMap;
    const id = props.exercise.id;

    return (
        id in visibilityMap && visibilityMap[id].visible ?
        <div className={css.row}>
            <p className={css.exerciseName} onClick={() => context.onExerciseClicked(props.exercise.id)}>{props.exercise.name}</p>
            <div className={css.bubbles}>
                {
                    props.exercise.sets.map((value,index) => {
                        return(
                            <SetBubble set={value}/>
                        )
                    })
                }
            </div>
        </div> : null
    )
};

export default WorkoutCardRow;


