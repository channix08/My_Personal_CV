import { ArrowUpRight, MapPin, Code, Database, FilmSlate, Scissors, GraduationCap, EnvelopeSimple, type Icon } from '@/components/slab'
import { profile } from '@/data/profile'
import { education } from '@/data/education'
import CertificatesFolder from './CertificatesFolder'

/**
 * Profile, education, academic honors, and certificates for the CV page.
 */

type Capability = {
  index: string
  title: string
  Icon: Icon
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Front-end development',
    Icon: Code,
  },
  {
    index: '02',
    title: 'Full-stack web development',
    Icon: Database,
  },
  {
    index: '03',
    title: 'Video editing',
    Icon: FilmSlate,
  },
  {
    index: '04',
    title: 'Short-form visual content',
    Icon: Scissors,
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid cv-about" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          I work across web development and video editing to make useful, engaging digital experiences.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I turn ideas into websites, apps, and videos.
            <span> Clear structure and thoughtful details make the work easier to use and enjoy.</span>
          </p>

          <p className="agrid__note">
            <strong>I'm Christian Lord V. Estorba</strong>, a full stack web developer and video editor based in Davao City, Philippines. I enjoy connecting technical problem solving with visual storytelling, from responsive interfaces to polished edits.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks"><span className="agrid__mark"><c.Icon size={20} weight="duotone" aria-hidden="true" /></span></span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <GraduationCap size={18} weight="duotone" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">BS Information Technology</span>
                <span className="agrid__cell-meta">Fourth-year student</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">Philippine Time (UTC+8)</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href={`mailto:${profile.email}`}>
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <EnvelopeSimple size={18} weight="duotone" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Get in touch</span>
                <span className="agrid__cell-meta">{profile.email}</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>

      <div className="cv-about__details">
        <section className="cv-card cv-card--education" aria-labelledby="education-title">
          <div className="cv-card__heading">
            <span className="cv-card__icon"><GraduationCap size={23} weight="duotone" aria-hidden="true" /></span>
            <div>
              <span className="pgrid__eyebrow">Academic background</span>
              <h2 id="education-title">Education &amp; honors</h2>
            </div>
          </div>
          <div className="cv-education__school">
            <h3>{education.school}</h3>
            <p>{education.degree}</p>
            <span>{education.yearLevel}</span>
          </div>
          <h3 className="cv-card__subhead">Dean’s List</h3>
          <ul className="cv-honors" role="list">
            {education.honors.map(({ year, semester, honor }) => (
              <li key={`${year}-${semester}`}>
                <span className="cv-honors__term">{year} · {semester}</span>
                <strong>{honor}</strong>
              </li>
            ))}
          </ul>
        </section>

        <div className="cv-about__side">
          <section className="cv-card" aria-labelledby="objective-title">
            <div className="cv-card__heading">
              <span className="cv-card__icon"><Code size={23} weight="duotone" aria-hidden="true" /></span>
              <div>
                <span className="pgrid__eyebrow">Career direction</span>
                <h2 id="objective-title">Objective</h2>
              </div>
            </div>
            <p className="cv-card__body">To keep growing as a full stack web developer and video editor by creating useful digital experiences and thoughtful visual stories.</p>
          </section>

          <CertificatesFolder />
        </div>
      </div>
    </section>
  )
}
