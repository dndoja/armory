import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import ProgramBlueprint from "./ProgramBlueprint";
import BlockBlueprint from "./BlockBlueprint";
import ExerciseBlueprint from "./ExerciseBlueprint";
import {mockExercise} from "../Mocks";

const weeksPerBlock = 7;
const primaryExercise = mockExercise('primary', 100, weeksPerBlock);

const mockBlock = (): BlockBlueprint => BlockBlueprint.make(weeksPerBlock,3)
    .withExercise(primaryExercise,0)
    .withExercise(mockExercise('dummy', 10,weeksPerBlock),0);

describe('ProgramBlueprint', () => {
    const blocks = [mockBlock(),mockBlock()];
    const blueprint = new ProgramBlueprint('asd', ...blocks);

    describe("getExerciseOverview", () => {
        const overview = blueprint.getExerciseOverview(primaryExercise.id)!;

        it('should return undefined if the id is invalid', () => {
            const badOverview = blueprint.getExerciseOverview('.1');
            expect(badOverview).toBeUndefined()
        });

        it('should return the correct exercise name', () => {
            expect(overview.name).toEqual(primaryExercise.name)
        });

        it('should return every set of an exercise for every week in each block', () => {
            overview.sets.forEach(item => {
                const exercise = blocks[item.block].getExerciseById(primaryExercise.id)!;
                expect(item.sets).toEqual(exercise.progression.getSetsAtWeek(item.week));
            });
        })
    });

    describe('updateExerciseTrainingMax', () => {
        it('should return the an exact copy of ProgramBlueprint if the ExerciseBlueprint provided is invalid', () => {
            const updatedBlueprint = blueprint.updateExerciseTrainingMax(new ExerciseBlueprint('',100,[], '.12'),120);
            // We check equality like this because jest's toEqual function doesn't work properly for these objects
            expect(JSON.stringify(updatedBlueprint)).toEqual(JSON.stringify(blueprint))
        });

        it('should update the training max of every TMaxVaryingSet', () => {
            const newTrainingMax = 120;
            const updatedTMax = blueprint.updateExerciseTrainingMax(primaryExercise.blueprint,newTrainingMax);
            updatedTMax.blocks.forEach(block => {
                block.getExercisesForBlueprint(primaryExercise.blueprint).forEach(exercise => {
                    exercise.progression.getAllSets().forEach(set => {
                        if (set instanceof TMaxVaryingSet){
                            expect(set.trainingMax).toBe(newTrainingMax)
                        }
                    })
                })
            })
        });
    })
});
