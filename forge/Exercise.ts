import { v4 as uuid } from 'uuid';
import Progression from "./progressions/Progression";

export default class Exercise {
    public id: string = uuid();
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}