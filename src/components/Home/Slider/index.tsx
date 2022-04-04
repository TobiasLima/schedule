import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './styles.module.scss';

interface slideProps {
  url: string;
}

const slideImages: slideProps[] = [
  {
    url: 'images/slide_1.jpg',
  },
  { 
    url: 'images/slide_2.jpg',
  },
];

export function Slider() {

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div style={{bottom: '1rem'}} >
        <ul className={styles.dots}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className={styles.slider}>
      <SlickSlider {...settings}>
        {slideImages.map((item, index) => (
          <div key={index} className={styles.eachSlide} >
            <img src={item.url} alt="banner" />
          </div>
        ))}
      </SlickSlider>
    </div>
  );
}