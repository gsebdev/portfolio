import styles from './contact-section.module.scss'

interface ContactSectionProps {
    id?: string
    active?: boolean
}
const ContactSection: React.FC<ContactSectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.contact} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <h2>Me contacter</h2>
                <p>Nhesitez pas à envoyer un message pour discuter ou pour une demande</p>
            </div>
        </section>
    )
}

export default ContactSection