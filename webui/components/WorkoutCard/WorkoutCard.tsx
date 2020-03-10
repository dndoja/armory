import styles from "./workout_card.module.scss"
import WorkoutCardRow from "./WorkoutCardRow";
import {TimelineDay} from "@armory/forge/src/timeline/ProgramTimeline";

type WorkoutCardProps = {
    workout: TimelineDay,
}

const WorkoutCard = (props: WorkoutCardProps) => {
    const exercises = props.workout.exercises;
    return(
        <div className={styles.card}>
            {
                exercises.map((value,index) => <WorkoutCardRow
                        key={index}
                        exercise={value}
                    />
                )
            }
        </div>
    )
};

export default WorkoutCard;