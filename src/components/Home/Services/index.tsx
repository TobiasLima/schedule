import { FiClock } from 'react-icons/fi';
import { FaLongArrowAltRight } from 'react-icons/fa';

import styles from './styles.module.scss';

const services = [
  {
    name: 'Corte simples',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    time: '20:00',
    price: 'R$ 15,00',
  },
  {
    name: 'Corte sompleto',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    time: '30:00',
    price: 'R$ 25,00',
  },
  {
    name: 'Barba',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    time: '20:00',
    price: 'R$ 25,00',
  },
  {
    name: 'Cabelo + Barba',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    time: '40:00',
    price: 'R$ 40,00',
  },
];

export interface scheduleDataProps {
  name: string;
  description: string;
  time: string;
  price: string;
}

interface ServiceProps {
  showScheduleForm(scheduleData: scheduleDataProps): void;
}

export function Services({ showScheduleForm }:ServiceProps) {
  
  return (
    <div className={styles.services} >
      <h3>Serviços</h3>

      <div className={styles.servicesList} >
        {services.map((item: scheduleDataProps, index) => (
          <div className={styles.servicesItem} key={index}>
            <div>
              <h3>{item.name} <span><FiClock />{item.time}</span></h3>
              <p>{item.description}</p>
            </div>
            <div className={styles.priceBox}>
              <p className={styles.price}>{item.price}</p>
              <button type="button" onClick={() => showScheduleForm(item)}>
                Reservar <FaLongArrowAltRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}