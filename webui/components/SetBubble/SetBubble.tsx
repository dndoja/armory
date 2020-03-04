import * as css from './set_bubble.scss'
import WorkoutSet from "../../types/WorkoutSet";

type SetBubbleProps = {
    set: WorkoutSet,
}

const SetBubble = (props: SetBubbleProps) => {
    return (
        <div className={css.circlePrimary}>
            <p className={css.innerText}>{props.set.reps}<br/>{props.set.weight}</p>
        </div>
    )
};

export default SetBubble;