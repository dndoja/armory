import { v4 as uuid } from 'uuid';
import BodyPart from "../common/BodyPart";
import Exercise from "../common/Exercise";
import Progression from "../progressions/Progression";
import ExerciseBlueprint from "./ExerciseBlueprint";

//todo find a better name
export default class ExerciseWithProgression implements Exercise{
    readonly blueprint: ExerciseBlueprint;
    readonly id: string;
    readonly name: string;
    readonly progression: Progression;

    constructor(blueprint: ExerciseBlueprint, progression: Progression, id: string = uuid()) {
        this.id = id;
        this.blueprint = blueprint;
        this.name = blueprint.name;
        this.progression = progression;
    }
}