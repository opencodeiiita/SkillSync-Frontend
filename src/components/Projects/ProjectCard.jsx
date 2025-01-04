import React from "react";

import styles from "./ProjectCard.module.css";

// Import the image directly
import defaultImage from "../.././assets/projects/project.png";  // Change this to the default image path you'd like

export const ProjectCard = ({
  project: { title, imageSrc = defaultImage, description, skills, demo, source },
}) => {
  return (
    <div className={styles.container}>
      <img
        src={imageSrc}  // Using the directly imported image
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul>
      <div className={styles.links}>
        <a href={demo} className={styles.link}>
          Mentor
        </a>
        <a href={source} className={styles.link}>
          Leave
        </a>
      </div>
    </div>
  );
};
