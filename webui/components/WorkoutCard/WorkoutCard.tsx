import * as css from "./workout_card.scss"
import Workout from "../../types/Workout";
import WorkoutCardRow from "./WorkoutCardRow";

type WorkoutCardProps = {
    workout: Workout,
}

const WorkoutCard = (props: WorkoutCardProps) => {
    const exercises = props.workout.exercises;
    return(
        <div className={css.card}>
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