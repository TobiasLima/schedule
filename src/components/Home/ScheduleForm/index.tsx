import { useEffect, useState } from 'react';
import moment from 'moment';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';

import { scheduleDataProps } from '../Services';
import { isArray } from 'util';

interface FormModalProps {
  scheduleData: scheduleDataProps;
  closeForm(): void;
}

interface EmployeeProps {
  id: number;
  name: string;
  avatar: string;
}

interface IFormInput {
  employee: string;
  day: string;
  hour: string;
  service: string;
  price: string;
  time: string;
}

const employee = [
  {
    id: 1,
    name: 'Luíz H.',
    avatar: 'images/avatar_1.png'
  },
  {
    id: 2,
    name: 'Leonardo',
    avatar: 'images/avatar_2.png'
  },
  {
    id: 3,
    name: 'Gabriel Jorge',
    avatar: 'images/avatar_3.png'
  }
]

const schema = yup.object({
  employee: yup.string().required('Selecione um funcionário.'),
  day: yup.string().required('Selecione o dia que deseja agendar.'),
  hour: yup.string().required('Selecione o horário que deseja agendar.'),
  service: yup.string(),
  price: yup.string(),
  time: yup.string(),
}).required();

export function ScheduleForm({scheduleData, closeForm}: FormModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProps | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [availableMorningHours, setAvailableMorningHours] = useState<string[]>([]);
  const [availablAfternoonHours, setAvailablAfternoonHours] = useState<string[]>([]);

  const { handleSubmit, register, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if(errors && Object.keys(errors).length > 0) {
      console.log('errors', errors);
      toast.error('Falha ao enviar, verifique os campos e tente novamente!');
    }
  }, [errors]);

  function nextTenDays(): string[] {
    let dates: string[] = [];
    const current = moment();
    let n = 8;
    while(n > 0){
      dates.push(current.format("YYYY-MM-DD"));
      current.add(1,"day")
      n--; 
    }
    return dates;
  }

  useEffect(() => {
    setSelectedHour('');
    axios.get('/api/schedule/availableDays', {
      params: {
        selectedDate 
      }
    }).then(resp => {
      setAvailableMorningHours(resp.data.rangesMorning);
      setAvailablAfternoonHours(resp.data.rangesAfternoon);
    })
  }, [selectedDate]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      let schedules = JSON.parse(localStorage.getItem("_SCHEDULES") || '');
      if(isArray(schedules)){
        schedules.push(data);
      }else{
        schedules = [{...data}];
      }
      localStorage.setItem('_SCHEDULES', JSON.stringify(schedules));
      toast.success('Sua solicitação foi agendada com sucesso, acesse "Meus agendamentos" caso deseje cancelar');
      closeForm();

    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className={styles.scheduleForm}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="hidden" {...register("service")} value={scheduleData.name} />
        <input type="hidden" {...register("price")} value={scheduleData.price} />
        <input type="hidden" {...register("time")} value={scheduleData.time} />

        <div className={styles.field}>
          <h4>Primeiro, escolha um profissional</h4>
          <div className={styles.radioField} >

            {employee.map((item: EmployeeProps, index) => (
              <label key={index} className={item.id === selectedEmployee?.id ? styles.active : ''}>
                <img src={item.avatar} alt={item.name} />
                <h5>{item.name}</h5>
                <input {...register("employee")} type="radio" value={item.name} onChange={() => setSelectedEmployee(item)} />
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <h4>Selecione um dia</h4>
          <div className={styles.radioField} >
            {nextTenDays().length > 0 ? (
              nextTenDays().map((item, index) => (
                <label key={index} className={item === selectedDate ? styles.active : ''}>
                  <h5>{moment(item).format('DD/MM/YYYY')}</h5>
                  <input {...register("day")} type="radio" value={item} onChange={() => setSelectedDate(item)} />
                </label>
              ))
            ) : (
              <p>Nenhum dia disponivel</p>
            )}
          </div>
        </div>

        <div className={`${styles.field} ${styles.hoursField}`}>
          <h4>Selecione um horário</h4>
          {selectedDate ? (
            availableMorningHours.length > 0 || availablAfternoonHours.length > 0 ? (
              <>
                {availableMorningHours.length > 0 && (
                  <div className={styles.radioField} >
                    {availableMorningHours.map((item, index) => (
                      <label key={index} className={item === selectedHour ? styles.active : ''}>
                        <h5>{item}</h5>
                        <input {...register("hour")} type="radio" value={item} onChange={() => setSelectedHour(item)} />
                      </label>
                    ))}
                  </div>
                )}
                {availablAfternoonHours.length > 0 && (
                  <div className={styles.radioField} >
                    {availablAfternoonHours.map((item, index) => (
                      <label key={index} className={item === selectedHour ? styles.active : ''}>
                        <h5>{item}</h5>
                        <input {...register("hour")} type="radio" value={item} name="hour" onChange={() => setSelectedHour(item)} />
                      </label>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p>Nenhum horário disponivel para o dia escolhido</p>
            )
          ) : (
            <p>Selecione uma data para ver os horários dísponiveis</p>
          )}
            
        </div>

        <div className={styles.services}>
          <h4>Serviço selecionado:</h4>
          <div className={styles.serviceBox}>
            <div>
              <h5>{scheduleData?.name}</h5>
              <p>{scheduleData?.description}</p>
            </div>
            <p className={styles.servicePrice}>{scheduleData.price}</p>
          </div>
        </div>

        <button type="submit">Agendar horário</button>
      </form>
    </div>
  );
}