import Link from "next/link";
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      Code Copy
      <Link href='https://github.com/luke-h1/code-copy' target='_blank'>
        Repo
      </Link>
    </div>
  )
}