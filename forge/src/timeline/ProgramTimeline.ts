import TimelineExercise from "./TimelineExercise";
import {List} from "immutable";

type ProgramTimeline = {
    readonly name: string
    readonly blocks: List<TimelineBlock>
}

type TimelineBlock = {
    readonly weeks: List<TimelineWeek>
}

type TimelineWeek = {
    readonly days: List<TimelineDay>
}

type TimelineDay = {
    readonly exercises: List<TimelineExercise>
}

export const iterateThroughTimeline = (program: ProgramTimeline, action: (block: number, week: number, day: number, exercise: TimelineExercise) => void) => {
    program.blocks.forEach((block, blockIndex) => {
        block.weeks.forEach((week,weekIndex) => {
            week.days.forEach((day, dayIndex) => {
                day.exercises.forEach(exercise => action(blockIndex,weekIndex,dayIndex,exercise))
            })
        })
    })
};

export {TimelineDay, TimelineWeek, TimelineBlock, ProgramTimeline};