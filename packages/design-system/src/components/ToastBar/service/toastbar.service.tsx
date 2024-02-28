import { ReactNode } from 'react';
import { uniqueId } from 'lodash-es';
import { Icon } from '../../Icon';
import { ToastBarEventListenerType, ToastBarProps } from '../ToastBar.type';
import { customEventService } from '../hooks';

const END_OF_DAY = Date.parse('9999-12-31');

export enum TOASTBAR_TYPE {
  ERROR = 'error',
  SUCCEED = 'succeed',
  DEFAULT = 'default',
}

type ToastbarOptionProps = {
  [i in TOASTBAR_TYPE]: { icon?: ReactNode; closeDelay: number };
};

const TOASTBAR_OPTIONS: ToastbarOptionProps = {
  error: {
    icon: <Icon icon='error' size={20} />,
    closeDelay: 1500,
  },
  succeed: {
    icon: <Icon icon='succeed' size={20} />,
    closeDelay: 1000,
  },
  default: {
    closeDelay: 1000,
  },
};

const newToastBar = (text: ReactNode, type: TOASTBAR_TYPE, id?: string): ToastBarProps => {
  const uid = id ?? uniqueId('toast-bar-');

  const autoCloseTimestamp = TOASTBAR_OPTIONS[type].closeDelay
    ? Date.now() + TOASTBAR_OPTIONS[type].closeDelay
    : END_OF_DAY;

  return {
    text,
    id: uid,
    autoCloseTimestamp,
    icon: TOASTBAR_OPTIONS[type].icon,
    closeDelay: TOASTBAR_OPTIONS[type].closeDelay,
  };
};

export const toastbarService = {
  errorMsg(text: ReactNode, id?: string) {
    const uid = id ?? uniqueId('err-toast-bar-');
    customEventService.dispatch<ToastBarEventListenerType, ToastBarProps>(
      '[toastbar] show errorMsg',
      { detail: newToastBar(text, TOASTBAR_TYPE.ERROR, id) },
    );
    return uid;
  },

  succeedMsg(text: ReactNode, id?: string) {
    const uid = id ?? uniqueId('succeed-toast-bar-');
    customEventService.dispatch<ToastBarEventListenerType, ToastBarProps>(
      '[toastbar] show succeedMsg',
      { detail: newToastBar(text, TOASTBAR_TYPE.SUCCEED, id) },
    );
    return uid;
  },

  defaultMsg(text: ReactNode, id?: string) {
    const uid = id ?? uniqueId('loading-toast-bar-');
    const customEvent = new CustomEvent('defaultMsg', {
      detail: newToastBar(text, TOASTBAR_TYPE.DEFAULT, id),
    });
    document.dispatchEvent(customEvent);

    return uid;
  },
  close(id: string) {
    customEventService.dispatch<ToastBarEventListenerType, string>('[toastbar] close Toast', {
      detail: id,
    });
  },
  closeAll() {
    customEventService.dispatch<ToastBarEventListenerType, void>('[toastbar] close all toast');
  },
};
