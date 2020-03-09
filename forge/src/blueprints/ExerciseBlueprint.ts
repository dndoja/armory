import { v4 as uuid } from 'uuid';
import BodyPart from "../common/BodyPart";
import Exercise from "../common/Exercise";

export default class ExerciseBlueprint implements Exercise{
    readonly id: string;
    readonly name: string;
    readonly trainingMax: number;
    readonly targetedBodyParts: BodyPart[];

    constructor(name: string,trainingMax: number, targetedBodyParts: BodyPart[] = [], id: string = uuid()) {
        this.id = id;
        this.name = name;
        this.targetedBodyParts = targetedBodyParts;
        this.trainingMax = trainingMax;
    }
}