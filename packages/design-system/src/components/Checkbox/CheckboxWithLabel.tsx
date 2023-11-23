import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from './Checkbox';
import { CheckboxWithLabelProps } from './Checkbox.type';
import styles from './CheckboxWithLabel.module.css';

export const CheckboxWithLabel = ({
  label,
  labelProps,
  ...checkboxProps
}: CheckboxWithLabelProps) => {
  const uid = checkboxProps.id || uuidv4();

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
