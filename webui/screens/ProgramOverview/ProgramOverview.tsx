import CollapsableSection from "../../components/CollapsableSection/CollapsableSection";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import Divider from "../../components/Divider/Divider";
import {ForgedProgram} from "@armory/forge/forged/ForgedProgram";

const ProgramOverview = (props: ForgedProgram) => <div>
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
                                                week.days.map((workout,index) => [
                                                     <WorkoutCard workout={workout}/>,
                                                    index < week.days.length -1 ? <Divider/> : null
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