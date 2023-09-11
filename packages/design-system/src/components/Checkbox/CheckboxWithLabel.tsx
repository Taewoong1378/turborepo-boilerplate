import { useId } from 'react';

import { Checkbox } from './Checkbox';
import { CheckboxWithLabelProps } from './Checkbox.type';
import styles from './CheckboxWithLabel.module.css';

export const CheckboxWithLabel = ({
  label,
  labelProps,
  ...checkboxProps
}: CheckboxWithLabelProps) => {
  const uid = checkboxProps.id || useId();

  return (
    <div className={styles.checkboxWithLabelWrap}>
      <Checkbox
        id={uid}
        {...checkboxProps}
        className={`${styles.checkbox} ${checkboxProps.className}`}
      />
      <label
        {...labelProps}
        htmlFor={uid}
        className={`${styles.checkboxLabel} ${checkboxProps.disabled && styles.disabled}`}
        aria-disabled={checkboxProps.disabled}>
        {label}
      </label>
    </div>
  );
};
