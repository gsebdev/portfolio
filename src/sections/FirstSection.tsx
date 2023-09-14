import Image from "next/image"
import styles from './first-section.module.scss'
import portrait from '../assets/img/portrait.jpg'

interface SectionProps {
    id?: string
    active?: boolean
}

const FirstSection: React.FC<SectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.section} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <h1><span className='text-overline-gradient'>Développeur Web.</span><br />Pour que votre idée<br />devienne réalité</h1>
                <div className={styles.portrait}>
                    <Image
                        src={portrait}
                        alt="photo de Sébastien Gault"
                        fill={true}
                        loading='lazy'
                        sizes="(max-width: 2048px) 30vw, (max-width: 768px) 50vw"
                        placeholder='blur' />

                </div>
                <p>J&apos;aime développer des applications avec des expériences utilisateur innovantes et performantes</p>
                <ul>
                    <li>e Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de ble des morceaux de texte pour réaliser un livre spécimen de polices de texte. </li>
                    <li>e Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de spécimen de polices de text</li>

                </ul>
            </div>

        </section>
    )
}

export default FirstSection