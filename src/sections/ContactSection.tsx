import ContactForm from '@/components/contact-form/ContactForm'
import styles from './contact-section.module.scss'
import { isEmail, isOnlyLetters } from '@/utils/formValidators'

interface ContactSectionProps {
    id?: string
    active?: boolean
}
const contactFormEntries = [
    {
        name: 'name',
        question: 'Quel est votre nom ?',
        validators: [{fn: isOnlyLetters, msg: 'Votre nom ne peut contenir que des lettres,\nMerci de réessayer'}]
    },
    {
        name: 'message',
        question: 'Enchanté [name] !\nQuel est votre message ?',
    },
    {
        name: 'answer',
        question: 'Quel est votre e-mail pour que je puisse vous répondre ?',
        validators: [{fn: isEmail, msg: 'Votre e-mail ne semble pas correct,\nMerci de réessayer'}]
    },
    {
        name: 'additionnal',
        question: 'Voulez ajouter des précisions avant d\'envoyer votre message ?',
    }
]

const ContactSection: React.FC<ContactSectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.contact} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <h2 className='text-overline-gradient'>Contactez-moi !</h2>
                <p className={styles.subtitle} >Vous avez un question, une proposition ou vous voulez juste faire connaissance ? N&#39;hesitez pas.</p>
            </div>
            <ContactForm entries={contactFormEntries} initialMsg='Envie de discuter ?' endMsg="Merci ! J'ai bien reçu votre message, je vous répondrais au plus vite dès que je l'aurai lu ;-)"/>
        </section>
    )
}

export default ContactSection