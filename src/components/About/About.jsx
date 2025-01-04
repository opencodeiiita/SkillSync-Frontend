import React from "react";

import styles from "./About.module.css";

// Directly import images
import aboutImage from "../../assets/about/aboutImage.png";
import cursorIcon from "../../assets/about/cursorIcon.png";
import serverIcon from "../../assets/about/serverIcon.png";

// If you'd like to use default images for other items, import them similarly.

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>Saved Workspaces</h2>
      <div className={styles.content}>
        <img
          src={aboutImage}  // Directly using the imported image
          alt="Workspace overview"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={cursorIcon} alt="Cursor icon" />  {/* Direct import used */}
            <div className={styles.aboutItemText}>
              <h3>Workspace 1</h3>
              <p>
                A collection of collaborative spaces where teams can work on
                shared projects efficiently.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={serverIcon} alt="Server icon" />  {/* Direct import used */}
            <div className={styles.aboutItemText}>
              <h3>Workspace 2</h3>
              <p>
                Easily access saved projects to continue work from where you
                left off.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={cursorIcon} alt="UI icon" />  {/* Direct import used */}
            <div className={styles.aboutItemText}>
              <h3>Workspace 3</h3>
              <p>
                Quickly bookmark important workspaces to revisit them later
                without hassle.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
