import { FaGraduationCap, FaCertificate } from 'react-icons/fa'
import styles from './about-section.module.scss'
import Carousel from '@/components/Carousel'
import Modal from '@/components/Modal'
import { useContext, useState } from 'react'
import { ScrollContext } from '@/context'
import Image from 'next/image'

interface AboutSectionProps {
    id?: string
    active?: boolean
}

const workImages = [
    '/images/work/emiliejoos.png', '/images/work/youraft.png', '/images/work/crazybulle.png', '/images/work/crazywater.png', '/images/work/github.png'
]
const AboutSection: React.FC<AboutSectionProps> = ({ id, active = false }) => {
    const [modalVisible, setModalVisible] = useState<number | null>(null)
    const { setStopMainScroll } = useContext(ScrollContext)

    return (
        <section id={id} className={`${styles.about} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <div className={styles.work}>
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
            <Carousel
                images={workImages}
                autoScroll={true}
                onClick={(i) => { 
                    setModalVisible(i)
                    setStopMainScroll(true)
                }}
            />
            <Modal
                visible={modalVisible !== null ? true : false}
                onClose={() => { 
                    setModalVisible(null)
                    setStopMainScroll(false)
                }}
            >
                <div>
                    <title>un titre de work</title>
                    <p>une description plus longue pour expliquer</p>
                    <Image src={workImages[modalVisible ? modalVisible : 0]} fill={true} alt="rien" sizes={'(max-width: 2048px) 20vw, (max-width: 768px) 30vw'}/>
                </div>

            </Modal>
        </section>
    )
}

export default AboutSection