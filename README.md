# Aeris Support — Support Console

A completely static support website for **Aeris**, designed as a custom "Aeris Support Console" rather than a generic documentation template.

## What makes it Aeris

- Custom Aeris branding using the supplied Aeris icon.
- "Aeris Support Console" navigation and release-channel language.
- Custom Quick Diagnosis section.
- Browser-side environment checks.
- Global **Ctrl + K** command palette for instant article navigation.
- Smooth internal page transitions.
- Animated orbital/technical hero treatment.
- Compact issue navigator built around real Aeris troubleshooting topics.
- Real Aeris 1.0.1 MSI and GFSDK Aftermath DLL included in `downloads/`.
- No backend, framework, API, database or Node.js requirement.

## Run locally

Extract the ZIP and open `index.html`.

All internal website paths are relative so the project works from a local folder and from static hosting.

## Configuration

Edit `js/app.js`:

```js
const AERIS={
  name:"Aeris",
  version:"1.0.1",
  discord:"https://discord.gg/aeris",
  installer:"downloads/Aeris_1.0.1_x64_en-US.msi"
};
```

Change `discord` to your real invite.

## Colors

The visual system is controlled by variables at the top of `css/style.css`, especially `--blue`, `--cyan`, `--bg`, `--surface`, and `--line`.

## Adding a fix

1. Create a new HTML file in `fixes/`.
2. Follow one of the existing article pages.
3. Add the article to the `SEARCH` array in `js/app.js`.
4. Add its navigation entry to `NAV` if you want it visible in the sidebar.

Each article is deliberately simple: title, category, description, causes, steps and optional image/notice.

## Downloads

The real files currently included are:

- `downloads/Aeris_1.0.1_x64_en-US.msi`
- `downloads/GFSDK_Aftermath_Lib.x64.dll`

The MSI is the main Aeris download. The DLL is linked from the descriptor-file troubleshooting page.

## Editing FAQs and changelog

- FAQ: `pages/faq.html`
- Changelog: `pages/changelog.html`

Both are plain HTML and can be edited without a build system.

## Deploying to Cloudflare Pages for Free

1. Create a free Cloudflare account.
2. Open Cloudflare Pages.
3. Create a new Pages project.
4. Connect the GitHub repository **or** upload the website files directly.
5. Deploy the project.
6. Cloudflare provides a free `*.pages.dev` address.
7. Name the Pages project `aeris-support` if that project name is available. The resulting address can then be `aeris-support.pages.dev`.

No paid domain, VPS, backend, database or Node.js hosting is required.

## GitHub Pages / Netlify

Upload the complete folder to the host and serve it as a static website. There is no build command.

## Optional custom domain

Later, connect a domain such as `aeris.gg` or `aerisproject.com` through Cloudflare Pages. The website uses relative internal links, so changing domains does not require rebuilding the site.

## Structure

```text
Aeris-Support/
├── index.html
├── 404.html
├── README.md
├── pages/
├── fixes/
├── assets/
│   ├── icons/
│   └── images/
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── search.js
└── downloads/
    ├── Aeris_1.0.1_x64_en-US.msi
    ├── GFSDK_Aftermath_Lib.x64.dll
    └── README.txt
```

## Motion

The website uses subtle transitions and an animated hero orbit. Users who enable reduced motion in their OS/browser automatically receive a motion-reduced experience.
