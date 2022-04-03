import Modal from 'react-modal';
import { FiXCircle } from 'react-icons/fi';

import { ScheduleForm } from '../ScheduleForm';

import styles from './styles.module.scss';

import { scheduleDataProps } from '../Services';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface FormModalProps {
  showModal: boolean;
  scheduleData: scheduleDataProps;
  closeModal(): void;
}

export function ModalForm({ showModal, closeModal, scheduleData }: FormModalProps) {

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={modalStyles}
    >
      <div className={styles.modalHeader}>
        <div>
          <h1>Barbearia do Luíz</h1>
          <p>Rua Nome da rua, 123, 12345-678, Campinas</p>
        </div>
        <button onClick={closeModal}>
          <FiXCircle />
        </button>
      </div>

      <ScheduleForm scheduleData={scheduleData} closeForm={closeModal} />
    </Modal>
  );
}