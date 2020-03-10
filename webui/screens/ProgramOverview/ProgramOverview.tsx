import Section from "../../components/Section/Section";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import Divider from "../../components/Divider/Divider";
import {ProgramTimeline} from "@armory/forge/src/timeline/ProgramTimeline";

const ProgramOverview = (props: ProgramTimeline) => <div>
    {
        props.blocks.map((block,blockIndex) => {
            return (
                <Section title={'Block ' + (blockIndex + 1)} isCollapsable={props.blocks.size > 1}>
                    {
                        block.weeks.map((week,index) => {
                            return (
                                <Section title={'Week ' + (index + 1)} isCollapsable={true}>
                                    {
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            {
                                                week.days.map((workout,index) => [
                                                     <WorkoutCard workout={workout}/>,
                                                    index < week.days.size -1 ? <Divider/> : null
                                                ])
                                            }
                                        </div>
                                    }
                                </Section>
                            )
                        })
                    }
                </Section>
            )
        })
    }
</div>;

export default ProgramOverview