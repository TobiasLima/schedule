import styles from './styles.module.scss';

export function Footer() {
  return (
    <div className={styles.footerContainer}>

      <div className={styles.footerContent}>
        <p>© 2022 - Todos os direitos reservados - Por Tobias Lima</p>
      </div>
    </div>
  );
}