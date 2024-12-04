import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/toraco-icon.webp"
            alt="toraco株式会社"
            width={40}
            height={40}
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="#services" className={styles.link}>
            Services
          </Link>
          <Link href="#news" className={styles.link}>
            News
          </Link>
          <Link href="#about" className={styles.link}>
            About
          </Link>
          <a
            href="https://share.hsforms.com/1vAN4BWSZRRuLSyg3gdd-Fgss65q"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
