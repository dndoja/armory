import ExerciseSet from "../workout_sets/ExerciseSet";
import RigidProgression from "./RigidProgression";
import {mapNTimes} from "../forged/Utilities";

describe('Rigid progression', () => {
    const sets: Array<ExerciseSet> = mapNTimes(2,i => {return{reps: 1 + i, weight: 100 + i}});
    const progression = new RigidProgression(...sets);

    it('should return the same sets for every week', () =>{
          expect(progression.getAllSets()).toEqual(progression.getSetsAtWeek(0))
    });

    describe('updateSets', () => {
        it('should return a new RigidProgression instance with the transformation applied to all of the sets', () =>{
            const newWeight = 5;
            const updatedSets = progression.updateSets(set => {{return {...set, weight: newWeight}}}).getAllSets();
            updatedSets.forEach(set => expect(set.weight).toBe(newWeight))
        })
    });
});