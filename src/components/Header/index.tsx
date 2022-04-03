import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logo} />

        <SignInButton />
      </div>
    </header>
  );
}