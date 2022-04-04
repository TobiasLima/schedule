import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';


import styles from './styles.module.scss';

export function SignInButton() {
  const [IsUserLogged] = useState(false); 

  return IsUserLogged ? (
      <button type="button" className={styles.signInButton}>
        Loggout <FiLogOut className={styles.logOutIcon} />
      </button>
    ) : (
      <button type="button" className={styles.signInButton}>
        <FaGithub className={styles.logInIcon} /> Login com GitHub
      </button>
    )
} 