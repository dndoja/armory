import ProgramBlueprint from "./blueprints/ProgramBlueprint";
import {mockProgram} from "./Mocks";

export const forge = (): ProgramBlueprint => mockProgram('4 days Upper/Lower',1,2,1);