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
        name: 'email',
        question: 'Quel est votre e-mail ?',
        validators: [{fn: isEmail, msg: 'Votre e-mail ne semble pas correct,\nMerci de réessayer'}]
    },
    {
        name: 'additionnal',
        question: 'Voulez ajouter des précisions avant d\'envoyer votre message ?',
    }
]
type formEntry = {
    name: string,
    answer?: string
}

const sendContactForm = async (data: formEntry[]): Promise<true|Error> => {
    try {
        const formatedData = {
            name: data.find(d => d.name === 'name')?.answer,
            email: data.find(d => d.name === 'email')?.answer,
            message: `${data.find(d => d.name === 'message')?.answer} \nMessage Additionnel : ${data.find(d => d.name === 'additionnal')?.answer}`
        }
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formatedData)
        })
        if (response.ok) {
          return true
        } else {
            return new Error(response.statusText)
        }
      } catch (error) {
        return new Error('Quelque chose s\'est mal passé lors de l\'envoi de votre message')
      }
}

const ContactSection: React.FC<ContactSectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.contact} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <h2 className='text-overline-gradient'>Contactez-moi !</h2>
                <p className={styles.subtitle} >Vous avez un question, une proposition ou vous voulez juste faire connaissance ? N&#39;hesitez pas.</p>
            </div>
            <ContactForm 
                entries={contactFormEntries}    
                initialMsg='Envie de discuter ?' 
                endMsg={"Merci !\nJ'ai bien reçu votre message.\nJe vous répond au plus vite ;-)"}
                sendCallback={sendContactForm}
                style={{
                    primaryColor: 'rgb(166, 78, 255);',
                    secondaryColor: 'rgb(56, 149, 255)',
                    color: 'white',
                    fontFamily: 'Red Hat Display',             
                }}
                />
        </section>
    )
}

export default ContactSection