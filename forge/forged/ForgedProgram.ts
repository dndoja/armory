import ForgedExercise from "./ForgedExercise";

type ForgedProgram = {
    name: string
    blocks: ForgedBlock[]
}

type ForgedBlock = {
    weeks: ForgedWeek[]
}

type ForgedWeek = {
    days: ForgedDay[]
}

type ForgedDay = {
    exercises: ForgedExercise[]
}

export {ForgedDay, ForgedWeek, ForgedBlock, ForgedProgram};