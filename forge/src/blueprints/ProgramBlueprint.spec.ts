import Progression from "../progressions/Progression";
import {FixedProgression} from "../progressions/FixedProgression";
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import {createMatrix} from "../common/Matrix";
import ProgramBlueprint from "./ProgramBlueprint";
import {List} from "immutable";

const mockedProgression = (trainingMax: number): Progression => new FixedProgression(
    createMatrix(
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}],
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}],
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}],
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}]
    )
);

describe('ProgramBlueprint', () => {
    it('should do something', () => {
        const blueprint = new ProgramBlueprint('asd');
        expect(blueprint.name).toBe('asd');
    });
});
