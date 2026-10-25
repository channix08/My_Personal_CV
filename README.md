# Portfolio

## Short Description

This is my personal CV and portfolio website. I am a full stack web developer and video editor, and this site presents my background, skills, education, Dean's List honors, certificates, and contact details. The Projects section is ready for the academic and personal projects I will add later.

## Student Name

**Christian Lord V. Estorba**

Fourth-year Bachelor of Science in Information Technology student at Davao del Norte State College.

## Technologies Used

- **Frontend:** React 19, TypeScript, Vite 6, React Router 7
- **Design:** CSS, Poppins, Phosphor icons
- **Animation and interaction:** GSAP, Lenis, Three.js
- **Development tools:** Git, GitHub, npm

## Live Vercel Link

**Deployment pending.** I will add the public Vercel URL here after deploying the website.

## Deploy to Vercel

1. Commit and push this project to the `main` branch of my GitHub repository.
2. In Vercel, select **Add New → Project** and import `channix08/My_Personal_CV`.
3. Set the root directory to the repository root, the framework preset to **Vite**, the build command to `npm run build`, and the output directory to `dist`.
4. Deploy, then open the generated `*.vercel.app` URL and check Home, About, Projects, Services, and Contact. Open `/about` directly to confirm page refreshes work.
5. Replace the pending link above with the verified Vercel URL.

The default build uses `/` for Vercel. The GitHub Pages workflow sets `SITE_BASE=/My_Personal_CV/` for its own deployment.

## Sections

- **Home:** introduction and tools I use
- **About:** profile, education, honors, career objective, and certificate gallery
- **Projects:** space for my upcoming academic and personal work
- **Services:** web development and video editing
- **Contact:** contact information, social profiles, and message form

## Run Locally

```bash
npm install
npm run dev
```

To check the production build and code quality:

```bash
npm run build
npm run lint
```

## Add My Content

| Content | Location |
| --- | --- |
| Profile, photo, and social links | `src/data/profile.ts` |
| Education and honors | `src/data/education.ts` |
| Certificate details | `src/data/certifications.ts` |
| Certificate images or PDFs | `public/certificates/` |
| Project details | `src/data/projects.ts` |
| Project screenshots | `public/projects/` |
| Tools I use | `src/components/ToolsMarquee.tsx` |

The Projects page will show my work after I add entries to `src/data/projects.ts`. The certificate folder displays the certificates listed in `src/data/certifications.ts`.

## Credits and License

This website uses [Phosphor icons](https://phosphoricons.com) and the Poppins font. The contour background technique was inspired by landonorris.com by OFF+BRAND. See [LICENSE](LICENSE) for source code license details.
