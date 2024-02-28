import { Dispatch, SetStateAction } from 'react';
import { ToastBarEventListenerType, ToastBarProps } from '../ToastBar.type';
import { useCustomEventListener } from './use-custom-event-listener';
import { useHandleToastBarList } from './use-handle-toast-bar-list';

interface UseToastBarCustomEventListenerProps {
  toastbars: ToastBarProps[];
  setToastbars: Dispatch<SetStateAction<ToastBarProps[]>>;
}

export const useToastBarCustomEventListener = ({
  toastbars,
  setToastbars,
}: UseToastBarCustomEventListenerProps) => {
  const { closeByIdToastBar, closeAllToastBar } = useHandleToastBarList({
    toastbars,
    setToastbars,
  });

  const addCb = (newItem: ToastBarProps) => setToastbars((prev) => prev.concat(newItem));

  /* toastbar 이벤트감지 핸들러 **/
  useCustomEventListener<ToastBarEventListenerType, ToastBarProps>({
    eventType: '[toastbar] show errorMsg',
    handler: addCb,
    depths: [addCb],
  });

  useCustomEventListener<ToastBarEventListenerType, ToastBarProps>({
    eventType: '[toastbar] show succeedMsg',
    handler: addCb,
    depths: [addCb],
  });

  useCustomEventListener<ToastBarEventListenerType, string>({
    eventType: '[toastbar] close Toast',
    handler: closeByIdToastBar,
    depths: [closeByIdToastBar],
  });

  useCustomEventListener<ToastBarEventListenerType, void>({
    eventType: '[toastbar] close all toast',
    handler: closeAllToastBar,
    depths: [closeAllToastBar],
  });
};
