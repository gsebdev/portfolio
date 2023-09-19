import ContactForm from '@/components/ContactForm'
import styles from './contact-section.module.scss'

interface ContactSectionProps {
    id?: string
    active?: boolean
}
const contactFormEntries = [
    {
        name: 'name',
        question: 'Quel est votre nom ?'
    },
    {
        name: 'email',
        question: 'Quel est votre email ?'
    },
    {
        name: 'message',
        question: 'Que vous voulez vous dire ??'
    }
]

const ContactSection: React.FC<ContactSectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.contact} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <h2 className='text-overline-gradient'>Contactez-moi !</h2>
                <p className={styles.subtitle} >Vous avez un question, une proposition ou vous voulez juste faire connaissance ? N&#39;hesitez pas.</p>
            </div>
            <ContactForm entries={contactFormEntries}/>
        </section>
    )
}

export default ContactSection