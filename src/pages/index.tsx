import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookSquare, FaTwitter, FaInstagram } from 'react-icons/fa';

import { Slider } from '../components/Home/Slider';
import { Services } from '../components/Home/Services';
import { BusinessHours } from '../components/Home/BusinessHours';
import { Team } from '../components/Home/Team';
import { ModalForm } from '../components/Home/ModalForm';

import styles from '../styles/Home.module.scss';

import { scheduleDataProps } from '../components/Home/Services';

const Home: NextPage = () => {
  const [showScheduleForm, setShowScheduleForm] = useState<boolean>(false);
  const [currentScheduleData, setCurrentScheduleData] = useState<scheduleDataProps>({} as scheduleDataProps);

  return (
    <div className={styles.container}>
      <Head>
        <title>Schedule</title>
        <meta name="description" content="Sistema de agendamento" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <section className={styles.about}>
          <div className={styles.row}>
            <div className={styles.col_6}>
              <Slider />
              <div className={styles.social}>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebookSquare /></a>
                <a href="#"><FaTwitter /></a>
              </div>
            </div> 
            <div className={styles.col_4}>
              <div className={styles.info}>
                <h1>Barbearia do Luíz</h1>
                <p><FiMapPin />Rua Nome da rua, 123, 12345-678, Campinas</p>
                <p><FiPhone />(19) 9999-9999</p>
                <p><FaWhatsapp />(19) 99999-9999</p>

                <h4>Sobre</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
          
        </section>


        <section className={styles.schedule}>
          <div className={styles.row}>
            <div className={styles.col_6}>
              <Services showScheduleForm={(scheduleData) => { setShowScheduleForm(true); setCurrentScheduleData(scheduleData)}} />
            </div>
            <div className={styles.col_4}>
              <BusinessHours />
              <Team></Team>
            </div>
          </div>
        </section>


      </main>

      <ModalForm showModal={showScheduleForm} closeModal={() => setShowScheduleForm(false)} scheduleData={currentScheduleData} />
    </div>
  )
}

export default Home
