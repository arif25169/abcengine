import abcs, { AbcModel } from './abcs';

export interface StoreModel {
  abcs: AbcModel;
}

const models: StoreModel = { abcs };

export default models;