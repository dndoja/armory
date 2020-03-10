import styles from "./exercise_overview.module.scss";
import SetBubble from "../SetBubble/SetBubble";
import Modal from 'react-modal';
import ModalProps from "../../models/ModalProps";
import {Scrollbar} from "react-scrollbars-custom";
import ExerciseOverview from "@armory/forge/src/common/ExerciseOverview";

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100
    },
    content: {
        borderColor:'transparent',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '40px',
        maxWidth: '600px',
        minWidth: '400px',
        background: '#33333d',
        padding: 0,
        zIndex: 101,
        overflow: 'hidden'
    }
};

class ExerciseOverviewModalProps implements ModalProps{
    exerciseSummary: ExerciseOverview;
    isOpen: boolean;
    onRequestClose: () => void;
}

const ExerciseOverviewModal = (props: ExerciseOverviewModalProps) => {
    return (
        props.exerciseSummary ?
        <Modal isOpen={props.isOpen} onRequestClose={() => props.onRequestClose()} style={modalStyle}>
            <div className={styles.container}>
                <p className={styles.title}>{props.exerciseSummary.name}</p>
                <div className={styles.content}>
                    <Scrollbar>
                    {
                        props.exerciseSummary.items.map(item => <div className={styles.row}>
                            <p className={styles.label}>{'Week ' + (item.week + 1)}</p>
                            <div style={{flex: 1}}>
                                <div className={styles.bubbles}>
                                    {
                                        item.sets.map(set => <SetBubble set={set}/>)
                                    }
                                </div>
                            </div>
                        </div>)
                    }
                    </Scrollbar>
                </div>
            </div>
        </Modal> : null
    )
};

export default ExerciseOverviewModal;