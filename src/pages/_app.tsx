import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default MyApp;
