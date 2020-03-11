import ProgramBlueprint from "./blueprints/ProgramBlueprint";
import {mockProgram} from "./Mocks";

export const forge = (): ProgramBlueprint => mockProgram('4 days Upper/Lower',2,6,1);