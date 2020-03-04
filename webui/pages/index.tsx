import WorkoutCard from "../components/WorkoutCard/WorkoutCard";
import WorkoutProgram, {getExerciseSummary} from "../types/WorkoutProgram";
import CollapsableSection from "../components/CollapsableSection/CollapsableSection";
import {ProgramOverviewContextProvider} from "../screens/ProgramOverview/ProgramOverviewContext";
import Modal from 'react-modal';
import {useState} from "react";
import ExerciseOverviewModal from "../components/ExerciseOverview/ExerciseOverviewModal";
import NavbarIcon from "../components/Navbar/NavbarIcon";
import Navbar from "../components/Navbar/Navbar";
import ProgramOverview from "../screens/ProgramOverview/ProgramOverview";
import Drawer from "../components/Drawer/Drawer";
import TrainingMaxesDrawer from "../components/TrainingMaxesDrawer/TrainingMaxesDrawer";
import "../public/styles/input.scss"
import ExerciseVisibilityDrawer from "../components/ExerciseVisibilityDrawer/ExerciseVisibilityDrawer";
import ExerciseVisibilityMap from "../types/ExerciseVisibilityMap";
import data from "../public/programs/building_the_monolith.json";

const toggledMap: ExerciseVisibilityMap = {};
const program: WorkoutProgram = data;
program.blocks.forEach(block => {
    block.weeks.forEach(week => week.workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
            toggledMap[exercise.id] = {visible:true,name:exercise.name};
        })
    }))
});


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

            <Navbar title={"Cool ass program"}>
                <NavbarIcon iconName="fa-eye" onClick={() => setIsVisibilityDrawerOpen(true)} label={"Exercise visibility"}/>
                <NavbarIcon iconName="fa-dumbbell" onClick={() => setIsDrawerOpen(true)} label={"Training maxes"}/>
            </Navbar>
            <TrainingMaxesDrawer isOpen={isDrawerOpen} onRequestClose={() => setIsDrawerOpen(false)}/>
            <ExerciseVisibilityDrawer isOpen={isVisibilityDrawerOpen} onRequestClose={() => setIsVisibilityDrawerOpen(false)} program={program}/>
            <ExerciseOverviewModal
                isOpen={modalState.isOpen}
                exerciseSummary={getExerciseSummary(program,modalState.exerciseId)}
                onRequestClose={() => setModalState({...modalState,isOpen: false})}
            />
            <div style={isVisibilityDrawerOpen ? {overflow:'hidden', height:'90vh'} : {}}>
                <ProgramOverview {...program}/>
            </div>
        </ProgramOverviewContextProvider>
    )
};

export default Home;