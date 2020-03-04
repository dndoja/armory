import { v4 as uuid } from 'uuid';
import BodyPart from "../common/BodyPart";
import Exercise from "../Exercise";

export default class ExerciseBlueprint implements Exercise{
    public id: string;
    public name: string;
    public trainingMax: number;
    public targetedBodyParts: BodyPart[];

    constructor(name: string,trainingMax: number, targetedBodyParts: BodyPart[] = [], id: string = uuid()) {
        this.id = id;
        this.name = name;
        this.trainingMax = trainingMax;
    }
}