import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

export type CheckTypes = boolean | 'mixed';

export type BaseAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>;

export interface CheckboxProps extends BaseAttributes {
  checked?: CheckTypes;
}

export interface CheckboxWithLabelProps extends CheckboxProps {
  label: string | ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}
