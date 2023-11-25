import { jotaiCreateActions } from 'shared-utils';
import { GeneralStoreActions } from './actions';
import { GeneralStoreSelector } from './selector';
import { GeneralStoreInfo } from './store';

export const useGeneralStore = () => {
  const { store, initialProp } = GeneralStoreInfo;

  return {
    store,
    actions: jotaiCreateActions<typeof GeneralStoreActions>(GeneralStoreActions),
    selector: GeneralStoreSelector,
    initialProp,
  };
};
