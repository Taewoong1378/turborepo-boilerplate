import { atom } from 'recoil';

import { v4 as uuidv4 } from 'uuid';

export const authState = atom<boolean>({
  key: `authState-${uuidv4()}`,
  default: false,
});
