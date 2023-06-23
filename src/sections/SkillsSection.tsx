import styles from './skills-section.module.scss'
import logoTypescript from '../assets/img/logo-typescript.svg'
import logoGit from '../assets/img/logo-git.svg'
import logoReact from '../assets/img/logo-react.svg'
import logoSymfony from '../assets/img/logo-symfony.svg'
import logoPhp from '../assets/img/logo-php.svg'
import logoGithub from '../assets/img/logo-github.svg'
import logoJavascript from '../assets/img/logo-javascript.svg'
import logoRedux from '../assets/img/logo-redux.svg'
import logoFigma from '../assets/img/logo-figma.svg'
import logoNext from '../assets/img/logo-nextjs.svg'

const skills = [
    {
        name: 'Symfony',
        content: '',
        logo: logoSymfony
    },
    {
        name: 'PHP',
        content: '',
        logo: logoPhp
    },
    {
        name: 'Javascript',
        content: '',
        logo: logoJavascript
    },
    {
        name: 'Typescript',
        content: '',
        logo: logoTypescript
    },
    {
        name: 'React JS',
        content: '',
        logo: logoReact
    },
    {
        name: 'Next JS',
        content: '',
        logo: logoNext
    },
    {
        name: 'Redux',
        content: '',
        logo: logoRedux
    },
    {
        name: 'Git',
        content: '',
        logo: logoGit
    },
    {
        name: 'GitHub',
        content: '',
        logo: logoGithub
    },
    {
        name: 'Figma',
        content: '',
        logo: logoFigma
    }

]
interface SkillsSectionProps {
    id?: string
    active?: boolean
}
const SkillsSection: React.FC<SkillsSectionProps> = ({ id, active = false }) => {
    return (
        <section id={id} className={`${styles.skills} ${active ? styles.active : ''}`}>
            <div className={styles.container}>
                <h2>Mes Skills</h2>
                <div className={styles.skillsContainer}>
                    {
                        skills.map((skill, index) => {
                            return (
                                <div key={skill.name + index}>
                                    <skill.logo />
                                    <h3>{skill.name}</h3>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default SkillsSection