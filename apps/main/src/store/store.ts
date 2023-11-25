import { atom } from 'jotai';

/**
 * Interface Store
 */
export interface GeneralStoreModel {
  [key: string]: any;
}

const initialProp: GeneralStoreModel = {};

const GeneralStore = atom<GeneralStoreModel>(initialProp);

export const GeneralStoreInfo = {
  store: GeneralStore,
  initialProp,
};
