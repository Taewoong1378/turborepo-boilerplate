import { useId } from 'react';

import { Icon } from '../Icon';
import styles from './Checkbox.module.css';
import { CheckboxProps } from './Checkbox.type';

export const Checkbox = ({ checked, disabled, id, className = '', ...props }: CheckboxProps) => {
  const uid = useId();

  return (
    <div className={`${styles.checkboxWrapper} ${className}`}>
      <input
        {...props}
        id={id || uid}
        type='checkbox'
        aria-checked={checked}
        checked={checked === 'mixed' ? !checked : checked}
        disabled={disabled}
      />
      <label className={styles.checkbox} htmlFor={id || uid}>
        <div className={styles.iconWrapper}>
          <Icon icon='checked-on' size={20} viewBox='0 1 24 24' />
        </div>
        <span
          className={styles.indeterminateIcon}
          style={{ opacity: checked === 'mixed' ? 1 : 0 }}
        />
      </label>
    </div>
  );
};
