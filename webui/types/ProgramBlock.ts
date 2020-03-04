import ProgramWeek from "./ProgramWeek";

export default class ProgramBlock {
    weeks: ProgramWeek[];

    constructor(blocks: ProgramWeek[]) {
        this.weeks = blocks;
    }
}