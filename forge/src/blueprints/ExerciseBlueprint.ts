import { v4 as uuid } from 'uuid';
import BodyPart from "../common/BodyPart";
import Exercise from "../common/Exercise";

export default class ExerciseBlueprint implements Exercise{
    public readonly id: string;
    public readonly name: string;
    public readonly trainingMax: number;
    public readonly targetedBodyParts: BodyPart[];

    constructor(name: string,trainingMax: number, targetedBodyParts: BodyPart[] = [], id: string = uuid()) {
        this.id = id;
        this.name = name;
        this.targetedBodyParts = targetedBodyParts;
        this.trainingMax = trainingMax;
    }
}