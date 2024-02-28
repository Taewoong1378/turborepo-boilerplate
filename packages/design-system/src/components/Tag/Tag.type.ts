import { Colors } from 'tailwind-base';
import { IconType } from '../Icon';

export enum TAG_COLOR {
  GRAY = 'gray-200',
}

export interface TagProps {
  text: string;
  icon?: {
    type: IconType;
    size?: number;
    color?: keyof typeof Colors;
  };
  color?: TAG_COLOR;
  className?: string;
}
