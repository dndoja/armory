import ExerciseBlueprint from "./ExerciseBlueprint";
import BodyPart from "../common/BodyPart";

describe('ExerciseBlueprint', () => {
    it('Should have all the properties initialized', () => {
        const name = 'test';
        const trainingMax = 100;
        const bodyParts = [BodyPart.Biceps];
        const id = '123';
        const blueprint = new ExerciseBlueprint(name,trainingMax,bodyParts,id);

        expect(blueprint.name).toBe(name);
        expect(blueprint.trainingMax).toBe(trainingMax);
        expect(blueprint.id).toBe(id);
        expect(blueprint.targetedBodyParts).toBe(bodyParts);
    });
});
