import React from "react";

import styles from "./Hero.module.css";
// Import the hero image directly
import heroImage from "../.././assets/hero/heroImage.png";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Mary</h1>
        <p className={styles.description}>Mary2510</p>
        <a href="mailto:myemail@email.com" className={styles.contactBtn}>
          User
        </a>
      </div>
      <img
        src={heroImage}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
