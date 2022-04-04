// import { SignInButton } from '../SignInButton';
import { useState } from 'react';
import { MySchedules } from '../MySchedules';

import styles from './styles.module.scss';

export function Header() {
  const [showSchedules, setShowSchedules] = useState<boolean>(false);
  
  return(
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.logo} />

          {/* <SignInButton /> */}
          <button onClick={() => setShowSchedules(true)}>Meus agendamentos</button>

        </div>
      </header>

      <MySchedules showModal={showSchedules} closeModal={() => setShowSchedules(false)} />
    </>
  );
}