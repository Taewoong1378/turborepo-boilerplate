import { atom } from 'jotai';
import { GeneralStoreInfo } from './store';

/**
 * Actions
 */
const onChange = atom(
  null,
  (
    get,
    set,
    update: {
      key: string;
      value: any;
    },
  ) => {
    const store = get(GeneralStoreInfo.store);
    set(GeneralStoreInfo.store, {
      ...store,
      [update.key]: update.value,
    });
  },
);

export const GeneralStoreActions = {
  onChange,
};
