import styles from './styles.module.scss';

const slideImages = [
  {
    url: 'images/slide_1.jpg',
  },
  { 
    url: 'images/slide_2.jpg',
  },
];

export function Slider() {

  return (
    <div className={styles.slider}>
      <img src="images/slide_1.jpg" alt="banner" />
    </div>
  );
}