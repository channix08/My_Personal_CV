import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Code,
  FilmSlate,
  Stack,
  EnvelopeSimple,
  Gear,
  Globe,
  AppWindow,
} from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. The Projects card stays empty until portfolio work is added.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const OFFERS = [
  { Icon: Globe, title: 'Websites', note: 'Responsive pages and design' },
  { Icon: AppWindow, title: 'Web apps', note: 'Interfaces and workflows' },
  { Icon: Gear, title: 'Full stack', note: 'Front end through back end' },
  { Icon: FilmSlate, title: 'Video editing', note: 'Pacing, cuts, and polish' },
] as const

const FOCUS = [
  { name: 'Plan', role: 'Understand the goal', work: 'Audience · Scope · Story' },
  { name: 'Build', role: 'Create the experience', work: 'Design · Code · Edit' },
  { name: 'Refine', role: 'Review the details', work: 'Feedback · Polish · Deliver' },
]

const PHOTOS = [profile.avatarSrc, profile.hero.portraitSrc, profile.avatarSrc]
const FOCUS_CHIPS = ['Responsive UI', 'Web apps', 'APIs', 'Video editing', 'Creative direction', 'Accessible design']

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const toolRows = [FOCUS_CHIPS.slice(0, 3), FOCUS_CHIPS.slice(3)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Academic and personal work will appear here." />
        <div className="bento__media bento__project-empty" aria-hidden="true">
          <span className="bento__project-empty-icon"><FolderOpen size={42} weight="duotone" /></span>
          <span>Coming soon</span>
        </div>
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Fourth-year BSIT student, developer, and editor." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={i} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      <Link to="/about" className="bento__card bento__card--ai">
        <CardHead Icon={Code} title="What I do" desc="Web development and visual storytelling." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((name, i) => (
                  <span key={`${name}-${i}`} className="bento__chip">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      <Link to="/services" className="bento__card bento__card--creds">
        <CardHead Icon={FilmSlate} title="Video editing" desc="Shape raw footage into a clear story." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <FilmSlate size={44} weight="duotone" />
          </span>
          <span className="bento__badge-tag">
            Cuts · pacing · polish
          </span>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Web and video work for your next idea." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      <Link to="/contact" className="bento__card bento__card--quotes">
        <CardHead Icon={EnvelopeSimple} title="Let's talk" desc="Tell me what you are building or editing." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...FOCUS, ...FOCUS].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <EnvelopeSimple size={14} weight="fill" />
                  <b>{c.name}</b>
                </span>
                <span className="bento__review-role">{c.role}</span>
                <span className="bento__review-work">{c.work}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
