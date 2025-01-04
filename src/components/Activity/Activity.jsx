import React from "react";

import styles from "./Activity.module.css";

// Import the images directly
import activityImage from "../../assets/about/aboutImage.png";
import cursorIcon from "../../assets/about/cursorIcon.png";
import serverIcon from "../../assets/about/serverIcon.png";

export const Activity = () => {
  return (
    <section className={styles.container} id="activity">
      <h2 className={styles.title}>Activity Analytics</h2>
      <div className={styles.content}>
        <img
          src={activityImage}
          alt="Activity overview"
          className={styles.activityImage}
        />
        <ul className={styles.activityItems}>
          <li className={styles.activityItem}>
            <img
              src={cursorIcon}
              alt="Workspace icon"
            />
            <div className={styles.activityItemText}>
              <h3>Workspaces Joined/Created</h3>
              <p className={styles.dataNumber}>12</p>
            </div>
          </li>
          <li className={styles.activityItem}>
            <img src={serverIcon} alt="Meeting icon" />
            <div className={styles.activityItemText}>
              <h3>Meetings Attended/Scheduled</h3>
              <p className={styles.dataNumber}>25</p>
            </div>
          </li>
          <li className={styles.activityItem}>
            <img src={cursorIcon} alt="Resource icon" />
            <div className={styles.activityItemText}>
              <h3>Resources Shared/Saved</h3>
              <p className={styles.dataNumber}>8</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
