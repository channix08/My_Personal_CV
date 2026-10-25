/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Social icons stay visible while their
 * profile URLs are being added; they become links once `href` is supplied.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Code, FilmSlate, MapPin, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href?: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Channix',
  firstName: 'Christian',
  handle: 'Christian Lord V. Estorba',
  role: 'Full Stack Developer & Video Editor',
  avatarSrc: '/profile.png',
  email: 'christianvaleestorba@gmail.com',
  location: 'Davao City, Philippines',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: 'Web', label: 'Development', Icon: Code },
    { value: 'Video', label: 'Editing', Icon: FilmSlate },
    { value: 'Davao', label: 'Philippines', Icon: MapPin },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'Full Stack Dev and', line2: 'Video Editor' },
  hero: {
    body: 'I build thoughtful web experiences and edit videos that make ideas clear, engaging, and easy to share.',
    portraitSrc: '/profile.jpg',
    portraitAlt: 'Portrait of Christian Lord V. Estorba',
  },
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/ch4nnix08', iconPath: '/icons/facebook.svg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christian-estorba-162a2a371/', iconPath: '/icons/linkedin.svg' },
    { label: 'GitHub', href: 'https://github.com/channix08', iconPath: '/icons/ai/github.svg' },
    { label: 'Discord', href: 'https://discord.com/users/1368776780638326824', iconPath: '/icons/discord.svg' },
  ],
}
