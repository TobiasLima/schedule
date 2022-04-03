import styles from './styles.module.scss';

const hours = [
  {start: 'Fechado'},
  {start: '8:00', end: '12:00', start2: '13:00', end2: '18:00'},
  {start: '8:00', end: '12:00', start2: '13:00', end2: '18:00'},
  {start: '8:00', end: '12:00', start2: '13:00', end2: '18:00'},
  {start: '8:00', end: '12:00', start2: '13:00', end2: '18:00'},
  {start: '8:00', end: '12:00', start2: '13:00', end2: '18:00'},
  {start: '8:00', end: '12:00'}
]

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

export function BusinessHours() {
  
  return (
    <div className={styles.businessHours}>
      <h3>Horário de funcionamento</h3>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Dom</th>
              <th>Seg</th>
              <th>Ter</th>
              <th>Qua</th>
              <th>Qui</th>
              <th>Sex</th>
              <th>Sab</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>Abre</td>
              {weekDays.map((item, index) => (
                <td key={index}>{hours[index].start || '-'}</td>
              ))}
            </tr>

            <tr>
              <td>Fecha</td>
              {weekDays.map((item, index) => (
                <td key={index}>{hours[index].end || '-'}</td>
              ))}
            </tr>

            <tr>
              <td>Abre</td>
              {weekDays.map((item, index) => (
                <td key={index}>{hours[index].start2 || '-'}</td>
              ))}
            </tr>

            <tr>
              <td>Fecha</td>
              {weekDays.map((item, index) => (
                <td key={index}>{hours[index].end2 || '-'}</td>
              ))}
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}