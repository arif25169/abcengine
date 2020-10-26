import { createStore, createTypedHooks } from 'easy-peasy';

import models, { StoreModel } from './models';

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreState }

export default createStore(models);