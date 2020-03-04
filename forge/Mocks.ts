import ExerciseBlueprint from "./blueprints/ExerciseBlueprint";
import BlockBlueprint from "./blueprints/BlockBlueprint";
import {FixedProgression} from "./progressions/FixedProgression";
import TMaxVaryingSet from "./workout_sets/TMaxVaryingSet";
import ProgramBlueprint from "./blueprints/ProgramBlueprint";
import Progression from "./progressions/Progression";
import ExerciseSet from "./workout_sets/ExerciseSet";
import Matrix, {createMatrix} from "./common/Matrix";

const blueprints = [
    new ExerciseBlueprint("Bench press",100),
    new ExerciseBlueprint("Squats",140),
    new ExerciseBlueprint("Overhead press", 60),
    new ExerciseBlueprint("Deadlift", 180)
];

const totalWeeks = 6;
const trainingDaysPerWeek = 3;

const block = new BlockBlueprint(totalWeeks,trainingDaysPerWeek);

const makeProgression = (exerciseBlueprint: ExerciseBlueprint): Progression => {
    const setsMatrix: Matrix<ExerciseSet> = createMatrix();

    for (let i = 0; i < totalWeeks; i++){
        setsMatrix.push([
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, 0.9),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, 0.9),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, 0.9),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, 0.9),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, 0.9)
        ])
    }
    return new FixedProgression(setsMatrix)
};

blueprints.forEach(blueprint => {
    for (let day = 0; day < trainingDaysPerWeek; day++) {
        block.addExerciseForDay(blueprint, day, makeProgression(blueprint))
    }
});

const makeMockedProgramBlueprint = (): ProgramBlueprint => {return {blocks:[block],exercisePool:{}}};

export { makeMockedProgramBlueprint };