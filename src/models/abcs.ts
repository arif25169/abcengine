import { Action, action } from 'easy-peasy';

export interface StepOneInterface {
  projectName: string,
  projectDescription: string,
  client: string,
  contractor: string,
}

export interface AbcModel {
  stepone: StepOneInterface ;
  setStepOne: Action<AbcModel>;
}

const abcs: AbcModel = {
  stepone: {projectName: "", projectDescription: "", client: "", contractor: ""},
  setStepOne: action((state, payload:any) => {
    state.stepone = payload;
}),
}

export default abcs;