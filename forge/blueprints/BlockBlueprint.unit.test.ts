import ExerciseBlueprint from "./ExerciseBlueprint";
import BlockBlueprint from "./BlockBlueprint";
import {FixedProgression} from "../progressions/FixedProgression";
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";


const progression = new FixedProgression([[
    new TMaxVaryingSet(8, 100, 1),
    new TMaxVaryingSet(8, 100, 1),
    new TMaxVaryingSet(8, 100, 1),
    new TMaxVaryingSet(8, 100, 1),
    new TMaxVaryingSet(8, 100, 1)
]]);

describe('BlockBlueprint', () => {
    it('Checks if an exercise added to the block will be able to be retrieved by its\' id', () => {
        const blueprint = new BlockBlueprint(3,5);
        const day = 2;
        const id = "test";
        blueprint.addExerciseForDay({id:id,name:"",targetedBodyParts:[],trainingMax:100},day,progression);
        const exerciseId = blueprint.getExercisesForDay(day)[0].id;
        expect(exerciseId).toBe(exerciseId);
    });
});
