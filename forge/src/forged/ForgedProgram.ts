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

export {ForgedDay, ForgedWeek, ForgedBlock, ForgedProgram};