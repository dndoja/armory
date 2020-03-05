import {ProgramOverviewContextProvider} from "../screens/ProgramOverview/ProgramOverviewContext";
import {useState} from "react";
import ExerciseOverviewModal from "../components/ExerciseOverview/ExerciseOverviewModal";
import NavbarIcon from "../components/Navbar/NavbarIcon";
import Navbar from "../components/Navbar/Navbar";
import ProgramOverview from "../screens/ProgramOverview/ProgramOverview";
import TrainingMaxesDrawer from "../components/TrainingMaxesDrawer/TrainingMaxesDrawer";
import "../public/styles/input.scss"
import ExerciseVisibilityDrawer from "../components/ExerciseVisibilityDrawer/ExerciseVisibilityDrawer";
import ExerciseVisibilityMap, {fromProgram} from "../models/ExerciseVisibilityMap";
import {forge} from "@armory/forge/Forge";
import {getExerciseOverview} from "@armory/forge/forged/Utilities";

const program = forge();
const toggledMap: ExerciseVisibilityMap = fromProgram(program);

const Home = () => {
    const [modalState,setModalState] = useState({isOpen: false, exerciseId: ''});
    const [isDrawerOpen,setIsDrawerOpen] = useState(false);
    const [isVisibilityDrawerOpen, setIsVisibilityDrawerOpen] = useState(false);

    const [exerciseVisibilityMap, setExerciseVisibilityMap] = useState(toggledMap);

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

            <Navbar title={program.name}>
                <NavbarIcon iconName="fa-eye" onClick={() => setIsVisibilityDrawerOpen(true)} label={"Exercise visibility"}/>
                <NavbarIcon iconName="fa-dumbbell" onClick={() => setIsDrawerOpen(true)} label={"Training maxes"}/>
            </Navbar>
            <TrainingMaxesDrawer isOpen={isDrawerOpen} onRequestClose={() => setIsDrawerOpen(false)}/>
            <ExerciseVisibilityDrawer isOpen={isVisibilityDrawerOpen} onRequestClose={() => setIsVisibilityDrawerOpen(false)} program={program}/>
            <ExerciseOverviewModal
                isOpen={modalState.isOpen}
                exerciseSummary={getExerciseOverview(program,modalState.exerciseId)}
                onRequestClose={() => setModalState({...modalState,isOpen: false})}
            />
            <div style={isVisibilityDrawerOpen ? {overflow:'hidden', height:'90vh'} : {}}>
                <ProgramOverview {...program}/>
            </div>
        </ProgramOverviewContextProvider>
    )
};

export default Home;