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
import logoHtml from '../assets/img/html-logo.svg'
import logoSass from '../assets/img/sass-logo.svg'
import logoCss from '../assets/img/css-logo.svg'
interface Skill {
    name: string
    logo: React.FC
}

const skills: Record<string, Skill[]> = {
    Frontend: [
        {
            name: 'HTML5',
            logo: logoHtml
        },
        {
            name: 'CSS3',
            logo: logoCss
        },
        {
            name: 'SASS',
            logo: logoSass
        },
        {
            name: 'Javascript',
            logo: logoJavascript
        },
        {
            name: 'Typescript',
            logo: logoTypescript
        },
        {
            name: 'React.JS',
            logo: logoReact
        },
        {
            name: 'Next.JS',
            logo: logoNext
        },
        {
            name: 'Redux',
            logo: logoRedux
        },
    ],
    Backend: [
        {
            name: 'Symfony',
            logo: logoSymfony
        },
        {
            name: 'PHP',
            logo: logoPhp
        },
    ],
    Outils: [
        {
            name: 'Git',
            logo: logoGit
        },
        {
            name: 'GitHub',
            logo: logoGithub
        },
        {
            name: 'Figma',
            logo: logoFigma
        }
    ]
}

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
                        Object.keys(skills).map((skillSection, index) => {
                            return (
                                <div key={skillSection + index} className={styles.skillSection}>
                                    <h3 className='text-overline-gradient'>{skillSection}.</h3>
                                    <ul>
                                        {
                                            skills[skillSection].map((skill, index) => {
                                                return (
                                                    <li key={skill.name + index}>
                                                        <skill.logo />
                                                        <h4>{skill.name}</h4>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
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