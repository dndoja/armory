import ExerciseBlueprint from "./blueprints/ExerciseBlueprint";
import BlockBlueprint from "./blueprints/BlockBlueprint";
import {FixedProgression} from "./progressions/FixedProgression";
import TMaxVaryingSet from "./workout_sets/TMaxVaryingSet";
import ProgramBlueprint from "./blueprints/ProgramBlueprint";
import Progression from "./progressions/Progression";
import ExerciseSet from "./workout_sets/ExerciseSet";
import Matrix, {createMatrix} from "./common/Matrix";

const blueprints = [
    new ExerciseBlueprint("Front squats", 100),
    new ExerciseBlueprint("Push press", 80),
    new ExerciseBlueprint("Curls", 40),
    new ExerciseBlueprint("Overhead press", 60),
    new ExerciseBlueprint("Bench press",100),
    new ExerciseBlueprint("Squats",140),
    new ExerciseBlueprint("Deadlift", 180)
];

const totalWeeks = 6;
const trainingDaysPerWeek = 3;

const block = new BlockBlueprint(totalWeeks,trainingDaysPerWeek);

const makeProgression = (exerciseBlueprint: ExerciseBlueprint, day: number): Progression => {
    const setsMatrix: Matrix<ExerciseSet> = createMatrix();

    for (let i = 0; i < totalWeeks; i++){
        const multiplier = ((day * 0.1) + 0.3) + (i * 0.1);
        setsMatrix.push([
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, multiplier),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, multiplier),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, multiplier),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, multiplier),
            new TMaxVaryingSet(8, exerciseBlueprint.trainingMax, multiplier)
        ])
    }
    return new FixedProgression(setsMatrix)
};

blueprints.forEach(blueprint => {
    for (let day = 0; day < trainingDaysPerWeek; day++) {
        block.addExerciseForDay(blueprint, day, makeProgression(blueprint, day))
    }
});

const makeMockedProgramBlueprint = (): ProgramBlueprint => {return {name:"Full body",blocks:[block],exercisePool:{}}};

export { makeMockedProgramBlueprint };