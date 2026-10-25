import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * The offers below describe the current web and video services.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Discover',
    body: 'We define the goal, audience, scope, and visual direction.',
    Icon: MagnetStraight,
    chips: ['Brief', 'Goals', 'References'],
  },
  {
    index: '02',
    label: 'Create',
    body: 'I build the site or shape the edit into a first version.',
    Icon: Timer,
    chips: ['Design', 'Code', 'Edit'],
  },
  {
    index: '03',
    label: 'Refine',
    body: 'We review feedback, polish the details, and prepare delivery.',
    Icon: Trophy,
    chips: ['Review', 'Polish', 'Deliver'],
  },
]

/* ---------- The services ---------- */

// Example tool marks from /public/icons. Swap for the tools you actually use.
const REACT = '/icons/ai/react.svg'
const VITE = '/icons/ai/vite.svg'
const CLOUDFLARE = '/icons/ai/cloudflare.svg'
const CHROME = '/icons/ai/googlechrome.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Websites',
    description: 'Responsive sites that present your work clearly on every screen.',
    chip: 'Web',
    logos: [REACT, VITE],
    bullets: ['Responsive layouts', 'Clear navigation', 'Accessible content'],
  },
  {
    index: '02',
    title: 'Web apps',
    description: 'Useful interfaces and workflows for products or internal tools.',
    chip: 'Build',
    logos: [REACT, VITE, CLOUDFLARE],
    bullets: ['Interface development', 'API integration', 'Thoughtful interactions'],
  },
  {
    index: '03',
    title: 'Site improvements',
    description: 'Updates that make an existing website easier to use and maintain.',
    chip: 'Improve',
    logos: [CHROME, REACT],
    bullets: ['UI cleanup', 'Mobile fixes', 'Performance review'],
  },
  {
    index: '04',
    title: 'Video editing',
    description: 'Strong pacing and clean cuts that support the message.',
    chip: 'Video',
    logos: [],
    bullets: ['Story structure', 'Sound and pacing', 'Final export'],
  },
  {
    index: '05',
    title: 'Short-form content',
    description: 'Concise edits designed for social and digital platforms.',
    chip: 'Content',
    logos: [],
    bullets: ['Vertical formats', 'Captions and titles', 'Platform-ready delivery'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Digital experiences, from screen to story.
        </h1>
        <p className="pgrid__lede">
          I build websites and web apps, and edit videos that hold attention and communicate clearly.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              Discover. Create. Refine.
              <br />
              <span>A clear path from idea to delivery.</span>
            </h2>
            <p className="sgrid__method-sub">
              Every project starts with the goal and gets stronger through focused feedback.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Ways I can help</h2>
            <p className="sgrid__offers-sub">Have a specific brief? Send it through the contact page.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
