import Image from 'next/image';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <Image
          src="/images/hero-background.webp"
          alt="やりたいをテクノロジーで実現する"
          fill
        />
      </div>
    </div>
  );
};

export default Hero;
