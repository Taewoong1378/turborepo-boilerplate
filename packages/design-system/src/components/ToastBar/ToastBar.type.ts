import { HTMLAttributes, ReactNode } from 'react';

export interface ToastBarProps {
  text: ReactNode;
  id: string;
  icon?: ReactNode;
  closeDelay?: number;
  autoCloseTimestamp?: number;
  style?: React.CSSProperties;
  removeInvisibleToastBar?: () => void;
}

export interface TinyToastBarProps {
  text: ReactNode;
  container: HTMLElement | null;
  id?: string;
  closeDelay: number;
  autoCloseTimestamp?: number;
  toastBarProps?: HTMLAttributes<HTMLDivElement>;
}

export interface TinyToastBarShowType {
  text: string;
  container: HTMLElement;
  toastBarProps: HTMLAttributes<HTMLDivElement>;
}

export declare type ToastBarEventListenerType =
  | '[toastbar] show errorMsg'
  | '[toastbar] show succeedMsg'
  | '[toastbar] close Toast'
  | '[toastbar] close all toast'
  | '[loadingToastbar] show loading toast'
  | '[loadingToastbar] close all loading toast'
  | '[tinyToastbar] show tiny toast'
  | '[tinyToastbar] close tiny toast';
