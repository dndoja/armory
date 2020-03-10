import {ProgramOverviewContextProvider} from "../screens/ProgramOverview/ProgramOverviewContext";
import {useState} from "react";
import ExerciseOverviewModal from "../components/ExerciseOverview/ExerciseOverviewModal";
import NavbarIcon from "../components/Navbar/NavbarIcon";
import Navbar from "../components/Navbar/Navbar";
import ProgramOverview from "../screens/ProgramOverview/ProgramOverview";
import TrainingMaxesDrawer from "../components/TrainingMaxesDrawer/TrainingMaxesDrawer";
import ExerciseVisibilityDrawer from "../components/ExerciseVisibilityDrawer/ExerciseVisibilityDrawer";
import ExerciseVisibilityMap, {fromProgramBlueprint} from "../models/ExerciseVisibilityMap";
import {forge} from "@armory/forge/src/Forge";
import ProgramBlueprint from "@armory/forge/src/blueprints/ProgramBlueprint";

/*
export async function getServerSideProps(context) {
    const thing = forge();
    return {props:{thing}} // will be passed to the page component as props}
}
*/

const props = forge();

const Home = () => {
    const [programBlueprint,setProgramBlueprint] = useState(props);
    const [modalState,setModalState] = useState({isOpen: false, exerciseId: ''});
    const [isDrawerOpen,setIsDrawerOpen] = useState(false);
    const [isVisibilityDrawerOpen, setIsVisibilityDrawerOpen] = useState(false);
    const [exerciseVisibilityMap, setExerciseVisibilityMap] = useState(fromProgramBlueprint(programBlueprint));

    function onExerciseClicked(exerciseId: string) {
        setModalState({isOpen: true,exerciseId: exerciseId})
    }

    function onExerciseVisibilityChanged(exerciseId: string, visible: boolean) {
        const old = exerciseVisibilityMap[exerciseId];
        const mutated = {...old, visible:visible};
        setExerciseVisibilityMap({...exerciseVisibilityMap,[exerciseId]:mutated});
        console.log({...exerciseVisibilityMap,[exerciseId]:mutated})
    }

    return (
        <ProgramOverviewContextProvider value={
            {
                onExerciseClicked: (exerciseId) => onExerciseClicked(exerciseId),
                onExerciseVisibilityChanged: (exerciseId, visible) => onExerciseVisibilityChanged(exerciseId,visible),
                exerciseVisibilityMap: exerciseVisibilityMap
            }}>

            <Navbar title={props.name}>
                <NavbarIcon iconName="fa-eye" onClick={() => setIsVisibilityDrawerOpen(true)} label={"Exercise visibility"}/>
                <NavbarIcon iconName="fa-dumbbell" onClick={() => setIsDrawerOpen(true)} label={"Training maxes"}/>
            </Navbar>
            <TrainingMaxesDrawer isOpen={isDrawerOpen} onRequestClose={() => setIsDrawerOpen(false)}/>
            <ExerciseVisibilityDrawer isOpen={isVisibilityDrawerOpen} onRequestClose={() => setIsVisibilityDrawerOpen(false)} program={programBlueprint}/>
            <ExerciseOverviewModal
                isOpen={modalState.isOpen}
                exerciseSummary={programBlueprint.getExerciseOverview(modalState.exerciseId)}
                onRequestClose={() => setModalState({...modalState,isOpen: false})}
            />
            <ProgramOverview {...programBlueprint.getTimeline()}/>
        </ProgramOverviewContextProvider>
    )
};

export default Home;