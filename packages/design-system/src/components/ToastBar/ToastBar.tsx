import { useEffect, useRef } from 'react';
import styles from './ToastBar.module.css';
import { ToastBarProps } from './ToastBar.type';
import { useAnimationToggle } from './hooks';

export const ToastBar = ({
  text,
  icon,
  closeDelay,
  autoCloseTimestamp,
  style,
  id,
}: ToastBarProps) => {
  const dissolveTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { mounted, trigger, onShow, onHide } = useAnimationToggle({
    transitionDuration: closeDelay || 0 + 1000,
  });

  useEffect(() => {
    onShow();
  }, [onShow]);

  useEffect(() => {
    if (autoCloseTimestamp === -1) {
      onHide();
      clearTimeout(dissolveTimeout.current);
    }
  }, [autoCloseTimestamp]);

  useEffect(() => {
    if (closeDelay) {
      dissolveTimeout.current = setTimeout(onHide, closeDelay);
    }
    return () => clearTimeout(dissolveTimeout.current);
  }, [closeDelay, onHide]);

  if (!mounted) return null;

  return (
    mounted && (
      <div
        id={id}
        className={styles.toastBar}
        style={{
          ...style,
          opacity: trigger,
          transform: trigger ? undefined : 'translate(0,30px)',
        }}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.message}>{text}</div>
      </div>
    )
  );
};
