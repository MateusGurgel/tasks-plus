import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import heroImage from "../../public/assets/hero.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tasks+</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo Tasks+"
            src={heroImage}
            priority
          />
        </div>
        <h1 className={styles.title}>Let's organize your tasks!</h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+12 posts</span>
          </section>
          <section className={styles.box}>
            <span>+12 comments</span>
          </section>
        </div>
      </main>
    </div>
  );
}
