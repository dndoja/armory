import ForgedExercise from "./ForgedExercise";
import {List} from "immutable";

type ForgedProgram = {
    readonly name: string
    readonly blocks: List<ForgedBlock>
}

type ForgedBlock = {
    readonly weeks: List<ForgedWeek>
}

type ForgedWeek = {
    readonly days: List<ForgedDay>
}

type ForgedDay = {
    readonly exercises: List<ForgedExercise>
}

export const iterateThrough = (program: ForgedProgram, action: (block: number, week: number, day: number, exercise: ForgedExercise) => void) => {
    program.blocks.forEach((block, blockIndex) => {
        block.weeks.forEach((week,weekIndex) => {
            week.days.forEach((day, dayIndex) => {
                day.exercises.forEach(exercise => action(blockIndex,weekIndex,dayIndex,exercise))
            })
        })
    })
};

export {ForgedDay, ForgedWeek, ForgedBlock, ForgedProgram};