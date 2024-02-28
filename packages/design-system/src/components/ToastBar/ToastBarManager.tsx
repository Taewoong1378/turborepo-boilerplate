import { useState } from 'react';
import { ToastBar } from './ToastBar';
import styles from './ToastBar.module.css';
import { ToastBarProps } from './ToastBar.type';
import { useLoadingToastBarCustomEventListener, useToastBarCustomEventListener } from './hooks';

/* loadidng toastbar 존재할 시 늘 일반 toastbar 보다 하단에 존재합니다.**/
export const ToastBarManager = () => {
  const [toastbars, setToastbars] = useState<ToastBarProps[]>([]);
  const [loadingToastbars, setLoadingToastbars] = useState<ToastBarProps[]>([]);

  /* toastBar Event 들을 감지하는 훅스 **/
  useToastBarCustomEventListener({ toastbars, setToastbars });

  /* loadingToastBar Event 들을 감지하는 훅스 **/
  useLoadingToastBarCustomEventListener({ loadingToastbars, setLoadingToastbars });

  return (
    <div className={styles.toastBarWrapper}>
      {toastbars.map((toastBarProps) => (
        <ToastBar
          key={toastBarProps.id}
          style={{
            transition: 'all 300ms ease',
          }}
          {...toastBarProps}
        />
      ))}
      {loadingToastbars.map((loadingToastbar) => (
        <ToastBar
          key={loadingToastbar.id}
          style={{
            transition: 'all 300ms ease',
          }}
          {...loadingToastbar}
        />
      ))}
    </div>
  );
};
