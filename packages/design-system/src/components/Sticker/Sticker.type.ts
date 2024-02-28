export enum STICKER_COLOR {
  RED = 'red',
}

export enum STICKER_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export interface StickerProps {
  text: string;
  size: STICKER_SIZE;
  color?: STICKER_COLOR;
  className?: string;
}
