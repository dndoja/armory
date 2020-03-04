import * as css from './set_bubble.scss'
import ExerciseSet from "@armory/forge/workout_sets/ExerciseSet";

type SetBubbleProps = {
    set: ExerciseSet,
}

const SetBubble = (props: SetBubbleProps) => {
    return (
        <div className={css.circlePrimary}>
            <p className={css.innerText}>{props.set.reps}<br/>{props.set.weight}</p>
        </div>
    )
};

export default SetBubble;