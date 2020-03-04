import ExerciseOverview from "../../models/ExerciseOverview";
import * as css from "./exercise_overview.scss";
import SetBubble from "../SetBubble/SetBubble";
import Modal from 'react-modal';
import ModalProps from "../../models/ModalProps";
import {Scrollbar} from "react-scrollbars-custom";

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
        props.exerciseSummary &&
        <Modal isOpen={props.isOpen} onRequestClose={() => props.onRequestClose()} style={modalStyle}>
            <div className={css.container}>
                <p className={css.title}>{props.exerciseSummary.name}</p>
                <div className={css.content}>
                    <Scrollbar>
                    {
                        props.exerciseSummary.sets.map(value => <div className={css.row}>
                            <p className={css.label}>{value[0]}</p>
                            <div style={{flex: 1}}>
                                <div className={css.bubbles}>
                                    {
                                        value[1].map(set => <SetBubble set={set}/>)
                                    }
                                </div>
                            </div>
                        </div>)
                    }
                    {
                    props.exerciseSummary.sets.map(value => <div className={css.row}>
                    <p className={css.label}>{value[0]}</p>
                    <div style={{flex:1}}>
                    <div className={css.bubbles}>
                    {
                        value[1].map(set => <SetBubble set={set}/>)
                    }
                    </div>
                    </div>

                    </div>
                    )
                }
                    </Scrollbar>
                </div>
            </div>
        </Modal>
    )
};

export default ExerciseOverviewModal;