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
- **Contact delivery on Vercel:** Vercel Function, Gmail API, Google OAuth 2.0

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
- **Contact:** contact information, social profiles, and a Gmail-backed message form on Vercel

## Connect the Contact Form to Gmail

Once configured, the Vercel version of the form sends messages to **christianvaleestorba@gmail.com** through a server-side function. The visitor's address is set as **Reply-To**, so I can reply directly. The credentials are never included in the browser bundle or committed to Git.

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project and enable the **Gmail API**. Configure the OAuth consent screen for an external app, add `christianvaleestorba@gmail.com` as a test user while in Testing, and request only the `https://www.googleapis.com/auth/gmail.send` scope.
2. Create an OAuth client of type **Desktop app**. Copy its client ID and client secret. In PowerShell, from this repository folder, run:

   ```powershell
   $env:GMAIL_CLIENT_ID = 'your-client-id'
   $env:GMAIL_CLIENT_SECRET = 'your-client-secret'
   node .\scripts\setup-gmail.mjs
   ```

   Open the URL printed in the terminal and authorize **christianvaleestorba@gmail.com**. The script displays a refresh token. Keep that token private; do not paste it into GitHub or a `VITE_` variable.
3. In **Vercel → Project → Settings → Environment Variables**, add `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, and `GMAIL_REFRESH_TOKEN` as server-side variables for Production. Redeploy after saving them.
4. Send a test message from the deployed Contact page and check the Gmail inbox (and Spam). If the form reports a delivery error, inspect the Vercel Function logs for `/api/contact`.

Google's OAuth **Testing** status makes refresh tokens for this scope expire after seven days. Move the OAuth app to **Production** and satisfy any Google verification requirements before relying on the form long term. See [Google's OAuth documentation](https://developers.google.com/identity/protocols/oauth2), [Gmail API sending guide](https://developers.google.com/workspace/gmail/api/guides/sending), and [Vercel's Vite Functions guide](https://vercel.com/docs/frameworks/frontend/vite).

The GitHub Pages build is static and still opens the visitor's email app when they submit the form. To exercise the `/api/contact` function locally, use `vercel dev`; the plain Vite development server does not run Vercel Functions.

## Run Locally

```bash
npm install
npm run dev
```

To check the production build and code quality:

```bash
npm run build
npm run lint
npm test
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
