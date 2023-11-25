import { GeneralStoreModel } from './store';

export const GeneralStoreSelector = {
  get: (store: GeneralStoreModel, key: string) => store[key],
};
