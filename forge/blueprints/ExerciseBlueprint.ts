import { v4 as uuid } from 'uuid';
import BodyPart from "../BodyPart";

export default class ExerciseBlueprint {
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