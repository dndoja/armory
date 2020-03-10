import {mapNTimes} from "../common/Utilities";
import {mockBlock, mockExercise} from "../Mocks";
import BlockBlueprint from "../blueprints/BlockBlueprint";
import ProgramBlueprint from "../blueprints/ProgramBlueprint";
import {buildTimeline} from "./TimelineBuilder";
import {iterateThroughTimeline} from "./ProgramTimeline";

describe('TimelineBuilder', () => {
    const weeksPerBlock = 7;
    const trainingDays = 3;
    const blocksNumber = 2;
    const mockedBlockData = mapNTimes(blocksNumber,() => mockBlock(weeksPerBlock,trainingDays));
    const mockedProgram = new ProgramBlueprint('', ...mockedBlockData);
    const programTimeline = buildTimeline(mockedProgram);
    it('should build a timeline with the correct number of blocks, weeks and days ', () => {
        expect(programTimeline.blocks.size).toBe(blocksNumber);
        programTimeline.blocks.forEach(block => {
            expect(block.weeks.size).toBe(weeksPerBlock);
            block.weeks.forEach(week => {
                expect(week.days.size).toBe(trainingDays);
            })
        })
    });

    it('should build a timeline with the correct variation of every exercise in each day', () => {
        iterateThroughTimeline(programTimeline, ((block, week, day, exercise) => {
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