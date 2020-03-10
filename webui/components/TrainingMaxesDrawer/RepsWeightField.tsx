import styles from "./training_maxes_drawer.module.scss"
import {useEffect, useState} from "react";

type RepsWeightFieldProps = {
    exerciseName: string
    initialReps?: number
    initialWeight?: number
    onChange?: (repsWeight:[number,number]) => void
}

//todo Get this from a user config
const step = 5;

const RepsWeightField = (props: RepsWeightFieldProps) => {
    const [state,setState] = useState({
        reps: props.initialReps?.toString() ?? '1',
        weight: props.initialWeight?.toString() ?? step.toString()
    });

    useEffect(() => props.onChange && props.onChange([Number(state.reps),Number(state.weight)]),[state]);

    return(
        <div>
            <p className={styles.exerciseName}>{props.exerciseName}</p>
            <div className={styles.repsWeightContainer}>
                <input
                    className={styles.input}
                    type={"number"}
                    placeholder={"Reps"}
                    min="1"
                    onChange={event => setState({...state, reps: event.target.value})}
                    value={state.reps}
                />
                <h4 className={styles.xSeparator}>X</h4>
                <input
                    className={styles.input}
                    type={"number"}
                    placeholder={"Weight"}
                    min={step.toString()}
                    onChange={event => setState({...state, weight: event.target.value})}
                    value={state.weight}
                    step={step}
                />
                <h4 className={styles.xSeparator}>kg</h4>
            </div>
        </div>
    );
};

export default RepsWeightField;