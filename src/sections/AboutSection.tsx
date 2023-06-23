import { FaGraduationCap, FaCertificate } from 'react-icons/fa'
import styles from './about-section.module.scss'

interface AboutSectionProps {
    id?: string
    active?: boolean
}
const AboutSection: React.FC<AboutSectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.about} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <div>
                    <h2>Je code & crée des applications</h2>
                    <p>Sites web, PWA, packages et projets perso</p>
                    <button className={styles.cta}>Voir mon travail</button>
                </div>
                <div className={styles.formation}>
                    <h2>Mes formations</h2>
                    <ul>
                        <li>
                            <div>
                                <FaCertificate className={styles.icon} />
                            </div>
                            <div>
                                <h3>Certification RNCP (Bac+3/4) Développeur d&apos;application - JavaScript React</h3>
                                <p>OpenClassrooms - <span>2023</span></p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <FaGraduationCap className={styles.icon} />
                            </div>
                            <div>
                                <h3>Licence de Cinéma et Audiovisuel</h3>
                                <p>Université Paris 3 - <span>2008</span></p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <FaGraduationCap className={styles.icon} />
                            </div>
                            <div>
                                <h3>BTS Audiovisuel</h3>
                                <p>Lycée de la communication - <span>2007</span></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </section>
    )
}

export default AboutSection