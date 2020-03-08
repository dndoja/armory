import { v4 as uuid } from 'uuid';
import Progression from "../progressions/Progression";
import BodyPart from "./BodyPart";

export default interface Exercise {
    readonly id: string;
    readonly name: string;
}