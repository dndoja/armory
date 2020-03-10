import styles from "./workout_card.module.scss";
import SetBubble from "../SetBubble/SetBubble";
import {useContext} from "react";
import ProgramOverviewContext from "../../screens/ProgramOverview/ProgramOverviewContext";
import TimelineExercise from "@armory/forge/src/timeline/TimelineExercise";

type WorkoutCardRowProps = {
    exercise: TimelineExercise,
}

const WorkoutCardRow = (props: WorkoutCardRowProps) => {
    const context = useContext(ProgramOverviewContext);
    const visibilityMap = context.exerciseVisibilityMap;
    const id = props.exercise.id;

    return (
        id in visibilityMap && visibilityMap[id].visible ?
        <div className={styles.row}>
            <p className={styles.exerciseName} onClick={() => context.onExerciseClicked(props.exercise.id)}>{props.exercise.name}</p>
            <div className={styles.bubbles}>
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


