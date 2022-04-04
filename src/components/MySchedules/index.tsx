import Modal from 'react-modal';
import { FiXCircle } from 'react-icons/fi';
import moment from 'moment';
import Swal from 'sweetalert2';

import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '0',
    width: '600px',
    maxWidth: '100%',
    maxHeight: '90vh'
  },
};

interface MySchedulesProps {
  showModal: boolean;
  closeModal(): void;
}

interface scheduleProps {
  employee: string;
  day: string;
  hour: string;
  service: string;
  price: string;
  time: string;
}

export function MySchedules({showModal, closeModal}: MySchedulesProps) {
  const [schedules, setSchedules] = useState<scheduleProps[]>([]);

  useEffect(() => {
    if(showModal) {
      // const schedulesAux = JSON.parse(localStorage.getItem("_SCHEDULES") || '');
      // setSchedules(schedulesAux);
    }
  }, [showModal]);

  function handleRemoveSchedule(scheduleId: number) {

    Swal.fire({
      title: 'Gostaria de cancelar o horário agendado?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const newSchedule = schedules.filter((item, index) => index !== scheduleId);
          setSchedules(newSchedule);
          // localStorage.setItem('_SCHEDULES', JSON.stringify(newSchedule));
          Swal.fire('Cancelado', '', 'success');
          // closeModal();
        } catch(err) {
          closeModal();
          Swal.fire('Falha ao cancelar, atualize a página e tente novamente', '', 'error');
        }
      }
    })
  }

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <div>
          <h1>Meus agendamentos</h1>
        </div>
        <button className={styles.closeBtn} onClick={closeModal}>
          <FiXCircle />
        </button>
      </div>

      <div className={styles.scheduleList} >
        {schedules.length > 0 ? (
          schedules.map((item, index) => (
            <div key={index} className={styles.scheduleItem}>
              <div>
                <h4>{`${item.service} (${item.employee}) - ${item.price}`}</h4>
                <p>{`${moment(item.day).format('DD/MM/yyyy')} ${item.hour}`}</p>
              </div>
              <button type="button" onClick={() => handleRemoveSchedule(index)}>Cancelar horário</button>
            </div>
          ))
        ) : (
          <p>Nenhum horário reservado.</p>
        )}
      </div>

    </Modal>
  );
}