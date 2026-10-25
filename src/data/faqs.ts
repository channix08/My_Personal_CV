export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What kind of work do you do?',
    a: 'I work on responsive websites, web apps, improvements to existing sites, and video edits. Share your idea or brief and I can tell you where I can help.',
  },
  {
    q: 'Can you handle both web and video?',
    a: 'Yes. I can help with the website or app side and with video content that supports it. The scope depends on what you need delivered.',
  },
  {
    q: 'How do we discuss a project?',
    a: 'Send a short description of the goal, any references, and the timeline you have in mind. We can use that to clarify the scope and next steps.',
  },
  {
    q: 'Where are you based?',
    a: 'I am based in Davao City, Philippines, in Philippine Time (UTC+8). Remote collaboration is welcome.',
  },
  {
    q: 'What should I include in my message?',
    a: 'Tell me what you are building or editing, who it is for, and what you want it to achieve. Links or examples help, but a simple outline is enough to start.',
  },
]
