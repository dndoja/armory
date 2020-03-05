import Section from "../../components/Section/Section";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import Divider from "../../components/Divider/Divider";
import {ForgedProgram} from "@armory/forge/forged/ForgedProgram";

const ProgramOverview = (props: ForgedProgram) => <div>
    {
        props.blocks.map(block => {
            return (
                <Section title={'Block 1'} isCollapsable={props.blocks.length > 1}>
                    {
                        block.weeks.map((week,index) => {
                            return (
                                <Section title={'Week ' + (index + 1)} isCollapsable={true}>
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