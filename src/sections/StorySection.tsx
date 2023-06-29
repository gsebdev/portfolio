import TimeLine from "@/components/TimeLine"
import styles from './story-section.module.scss'

const bio = [
    {
        title: 'Mes premières lignes de code',
        time: '2005',
        content: 'L\'histoire commence au lycée, lorsque pendant mon temps libre je programme sur ma calculatrice de petits jeux en TI basic'
    },
    {
        title: 'Début de carrière dans l\'Audiovisuel',
        time: '2008',
        content: 'Je commence ma carrière en post-production audiovisuelle après avoir obtenu un BTS Audiovisuel et une Licence De Cinéma'
    },
    {
        title: 'Voyages',
        time: '2012',
        content: 'Australie, Nouvelle-Zélande, Amérique du Sud'
    },
    {
        title: 'Encadrement de sports d\'eaux-vives',
        time: '2014',
        content: ''
    },
    {
        title: 'Co-fondation de YOURAFT Serre Chevalier',
        time: '2019',
        content: ''
    },
    {
        title: 'Développement Web',
        time: '2020',
        content: ''
    }
]

interface StorySectionProps {
    id?: string
    active?: boolean
}
const StorySection: React.FC<StorySectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.story} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <h2 className='text-overline-gradient'>Ma Story</h2>
                <div>
                    <TimeLine timelineElements={bio} />
                </div>
            </div>
        </section>
    )
}

export default StorySection