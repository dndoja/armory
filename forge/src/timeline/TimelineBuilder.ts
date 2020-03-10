import ProgramBlueprint from "../blueprints/ProgramBlueprint";
import {TimelineBlock, TimelineDay, ProgramTimeline, TimelineWeek} from "./ProgramTimeline";
import BlockBlueprint from "../blueprints/BlockBlueprint";
import {List} from "immutable";
import TimelineExercise from "./TimelineExercise";
import {mapNTimes} from "../common/Utilities";

const buildTimelineExercises = (blueprint: BlockBlueprint, day: number, week: number): List<TimelineExercise> => {
    return blueprint.getExercisesForDay(day).map(exercise => {
        const sets = exercise.progression.getSetsAtWeek(week);
        return new TimelineExercise(exercise.id, exercise.name, sets)
    });
};

const buildTimelineDays = (blueprint: BlockBlueprint, week: number): List<TimelineDay> => {
    return List(mapNTimes(blueprint.trainingDaysPerWeek, day => {
        return {exercises: buildTimelineExercises(blueprint, day, week)}
    }));
};

const buildTimelineWeeks = (blueprint: BlockBlueprint): List<TimelineWeek> => {
    return List(mapNTimes(blueprint.totalWeeks, week => {
        return {days: buildTimelineDays(blueprint, week)}
    }));
};

const buildTimelineBlock = (blueprint: BlockBlueprint): TimelineBlock => {
    return {weeks: buildTimelineWeeks(blueprint)}
};

const buildTimeline = (programBlueprint: ProgramBlueprint): ProgramTimeline => {
    return {name: programBlueprint.name, blocks: programBlueprint.blocks.map(block => buildTimelineBlock(block))}
};

export {buildTimeline};