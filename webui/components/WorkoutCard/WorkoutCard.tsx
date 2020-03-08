import * as css from "./workout_card.scss"
import WorkoutCardRow from "./WorkoutCardRow";
import {ForgedDay} from "@armory/forge/src/forged/ForgedProgram";

type WorkoutCardProps = {
    workout: ForgedDay,
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