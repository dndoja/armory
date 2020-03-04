import { v4 as uuid } from 'uuid';
import Progression from "./progressions/Progression";

export default interface Exercise {
    id: string;
    name: string;
}