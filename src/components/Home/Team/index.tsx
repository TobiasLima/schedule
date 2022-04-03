import styles from './styles.module.scss';

export function Team() {
  return(
    <div className={styles.team}>
      <h3>Membros da equipe</h3>

      <div className={styles.teamList}>
        <div><img src="images/avatar_1.png" alt="Nome do funcionário" /></div>
        <div><img src="images/avatar_2.png" alt="Nome do funcionário" /></div>
        <div><img src="images/avatar_3.png" alt="Nome do funcionário" /></div>
      </div>
    </div>
  );
}