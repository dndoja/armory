import React from 'react'
import ExerciseVisibilityMap from "../../models/ExerciseVisibilityMap";
import ExerciseBlueprint from "@armory/forge/src/blueprints/ExerciseBlueprint";

export interface ProgramOverviewContextProps {
    exerciseVisibilityMap: ExerciseVisibilityMap;
    onExerciseVisibilityChanged(exerciseId: string, visible: boolean)
    onExerciseClicked(exerciseId: string)

    onTrainingMaxChanged(blueprint: ExerciseBlueprint, reps: number, weight: number);
}

const ProgramOverviewContext = React.createContext<ProgramOverviewContextProps>({
        exerciseVisibilityMap: {},
        onExerciseVisibilityChanged(exerciseId: string, visible: boolean) {},
        onExerciseClicked(exerciseId: string){},
        onTrainingMaxChanged(blueprint: ExerciseBlueprint, reps: number, weight: number) {}
    }
);

export const ProgramOverviewContextProvider = ProgramOverviewContext.Provider;
export const ProgramOverviewContextConsumer = ProgramOverviewContext.Consumer;
export default ProgramOverviewContext