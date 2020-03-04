import WorkoutProgram from "../../types/WorkoutProgram";
import CollapsableSection from "../../components/CollapsableSection/CollapsableSection";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import Divider from "../../components/Divider/Divider";

const ProgramOverview = (props: WorkoutProgram) => <div>
    {
        props.blocks.map(block => {
            return (
                <CollapsableSection title={'Block 1'}>
                    {
                        block.weeks.map((week,index) => {
                            return (
                                <CollapsableSection title={'Week ' + (index + 1)}>
                                    {
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            {
                                                week.workouts.map((workout,index) => [
                                                     <WorkoutCard workout={workout}/>,
                                                    index < week.workouts.length -1 ? <Divider/> : null
                                                ])
                                            }
                                        </div>
                                    }
                                </CollapsableSection>
                            )
                        })
                    }
                </CollapsableSection>
            )
        })
    }
</div>;

export default ProgramOverview