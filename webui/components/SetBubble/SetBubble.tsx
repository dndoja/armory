import * as css from './set_bubble.scss'
import ExerciseSet from "@armory/forge/src/workout_sets/ExerciseSet";

type SetBubbleProps = {
    set: ExerciseSet,
}

const SetBubble = (props: SetBubbleProps) => {
    const formattedWeight = props.set.weight.toLocaleString('en-us', {maximumFractionDigits: 2});
    return (
        <div className={css.circlePrimary}>
            <p className={css.innerText}>{props.set.reps}<br/>{formattedWeight}</p>
        </div>
    )
};

export default SetBubble;