import { Dispatch, SetStateAction } from 'react';
import { ToastBarEventListenerType, ToastBarProps } from '../ToastBar.type';
import { useCustomEventListener } from './use-custom-event-listener';

interface UseLoadingToastBarCustomEventListenerProps {
  loadingToastbars: ToastBarProps[];
  setLoadingToastbars: Dispatch<SetStateAction<ToastBarProps[]>>;
}

export const useLoadingToastBarCustomEventListener = ({
  loadingToastbars,
  setLoadingToastbars,
}: UseLoadingToastBarCustomEventListenerProps) => {
  const closeAllToastBar = () => {
    const updatedLoadingToastBar = loadingToastbars.map((loadingToastbar) => {
      return { ...loadingToastbar, autoCloseTimestamp: -1 };
    });
    setLoadingToastbars(updatedLoadingToastBar);
  };

  const addCb = (newItem: ToastBarProps) => setLoadingToastbars((prev) => prev.concat(newItem));

  /* lodingToastBar 이벤트감지 핸들러 **/
  useCustomEventListener<ToastBarEventListenerType, ToastBarProps>({
    eventType: '[loadingToastbar] show loading toast',
    handler: addCb,
    depths: [addCb],
  });

  useCustomEventListener<ToastBarEventListenerType, void>({
    eventType: '[loadingToastbar] close all loading toast',
    handler: closeAllToastBar,
    depths: [addCb],
  });
};
