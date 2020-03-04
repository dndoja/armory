import ExerciseBlueprint from "@armory/forge/blueprints/ExerciseBlueprint";
import BlockBlueprint from "@armory/forge/blueprints/BlockBlueprint";
import {FixedProgression} from "@armory/forge/progressions/FixedProgression";
import TMaxVaryingSet from "@armory/forge/workout_sets/TMaxVaryingSet";

const blueprints = [
    new ExerciseBlueprint("Bench press",100),
    new ExerciseBlueprint("Squats",140),
    new ExerciseBlueprint("Overhead press", 60),
    new ExerciseBlueprint("Deadlift", 180)
];

const block = new BlockBlueprint(6,3);

blueprints.forEach(blueprint => {
    block.addExerciseForDay(blueprint,0, new FixedProgression([
            [5].map(() =>  new TMaxVaryingSet(8, blueprint.trainingMax, 0.9))
        ]
    ))
});

const Home = () => {

    return (
        <div>
            <div style={{width:100, height:100, backgroundColor:'red'}} onClick={() => block.log()}/>
            <div style={{width:100, height:100, backgroundColor:'blue'}} onClick={() => block.updateTrainingMaxForBlueprint(blueprints[0].id,130)}/>
        </div>
    )
};

export default Home;