import {mapNTimes} from "./Utilities";
import {mockBlock, mockExercise} from "../Mocks";
import BlockBlueprint from "../blueprints/BlockBlueprint";
import ProgramBlueprint from "../blueprints/ProgramBlueprint";
import {forgeProgram} from "./Forge";
import {iterateThrough} from "./ForgedProgram";

describe('Forge', () => {
    const weeksPerBlock = 7;
    const trainingDays = 3;
    const blocksNumber = 2;
    const mockedBlockData = mapNTimes(blocksNumber,() => mockBlock(weeksPerBlock,trainingDays));
    const mockedProgram = new ProgramBlueprint('', ...mockedBlockData);
    const forgedProgram = forgeProgram(mockedProgram);
    it('should forge the correct number of blocks, weeks and days ', () => {
        expect(forgedProgram.blocks.size).toBe(blocksNumber);
        forgedProgram.blocks.forEach(block => {
            expect(block.weeks.size).toBe(weeksPerBlock);
            block.weeks.forEach(week => {
                expect(week.days.size).toBe(trainingDays);
            })
        })
    });

    it('should have the correct exercise in each day', () => {
        iterateThrough(forgedProgram, ((block, week, day, exercise) => {
            expect(mockedBlockData[block].getExercisesForDay(day).map(e => e.id)).toContain(exercise.id);
            const exerciseAtBlueprint = mockedBlockData[block].getExerciseById(exercise.id)!;
            const setsAtWeek = exerciseAtBlueprint.progression.getSetsAtWeek(week);
            expect(setsAtWeek.size).toBe(exercise.sets.size);
            setsAtWeek.forEach((set,index) => {
                expect(set.reps).toBe(exercise.sets.get(index)!.reps);
                expect(set.weight).toBe(exercise.sets.get(index)!.weight);
            });
        }))
    });
});