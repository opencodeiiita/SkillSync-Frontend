import styles from "../App.module.css";
import { About } from "../components/About/About";
import { Contact } from "../components/Contact/Contact";
import { Experience } from "../components/Experience/Experience";
import { Hero } from "../components/Hero/Hero";
// import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "../components/Projects/Projects";
import { Activity } from "../components/Activity/Activity";
import { Navbar } from '../components/Navbar.tsx';


function Profile() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Activity />
      
    </div>
  );
}

export default Profile;
