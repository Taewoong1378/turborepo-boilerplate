import styles from './LoadingIcon.module.css';

export const LoadingIconSmall = () => {
  return (
    <div className={styles.loading__small}>
      <span className={styles.loading__small__inner}>
        <span className={`${styles.loading__small__common} ${styles.loading__small__dot}`} />
        <span className={`${styles.loading__small__common} ${styles.loading__small__dot}`} />
        <span className={`${styles.loading__small__common} ${styles.loading__small__dot}`} />
      </span>
    </div>
  );
};
