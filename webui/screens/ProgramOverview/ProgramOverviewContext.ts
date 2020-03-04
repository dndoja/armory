import React from 'react'
import ExerciseVisibilityMap from "../../types/ExerciseVisibilityMap";

export interface ProgramOverviewContextProps {
    exerciseVisibilityMap: ExerciseVisibilityMap;
    onExerciseVisibilityChanged(exerciseId: string, visible: boolean)
    onExerciseClicked(exerciseId: string)
}

const ProgramOverviewContext = React.createContext<ProgramOverviewContextProps>({
        exerciseVisibilityMap: {},
        onExerciseVisibilityChanged(exerciseId: string, visible: boolean) {},
        onExerciseClicked(exerciseId: string){},
    }
);

export const ProgramOverviewContextProvider = ProgramOverviewContext.Provider;
export const ProgramOverviewContextConsumer = ProgramOverviewContext.Consumer;
export default ProgramOverviewContext