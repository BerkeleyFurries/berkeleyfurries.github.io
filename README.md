# 🐾 Furries at Berkeley Website

Welcome to the repository for the official website of **Furries at Berkeley**!

## Local Development

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v22 or later) installed.

### 2. Setup
Install the project dependencies:
```bash
npm install
```

### 3. Run the Dev Server
Start the local development server:
```bash
npm run dev
```
Open `http://localhost:4321` in your browser. The site uses Hot Module Replacement (HMR), so any edits will be instantly refreshed.

### 4. Build Locally
To test if the site builds correctly before pushing:
```bash
npm run build
```
The output will compile into the `dist/` directory.

## Project Structure

Here is a quick tour of how the project is organized:

```text
├── .github/workflows/  # Deployment workflow (astro.yml)
├── public/             # Static assets (images, logos, icons)
│   ├── gallery/        # Dynamic event photo galleries & event.json (see public/gallery/README.md)
│   └── img/            # Club logos and social media graphics
├── src/
│   ├── layouts/        # Reusable templates
│   │   └── BaseLayout.astro  # Main navigation taskbar, footer, and CSS variables
│   └── pages/          # Pages of the site (routing is file-based)
│       ├── index.astro       # Homepage
│       ├── events.astro      # Event schedule & calendar embed
│       ├── gallery.astro     # Photo gallery
│       ├── artists.astro     # Featured club artist directories
│       └── contact.astro     # Social links and contact info
├── astro.config.mjs    # Astro configuration file
├── package.json        # Node dependencies and scripts
└── tsconfig.json       # TypeScript configuration (used for editor autocomplete)
```

## Deployment

This website is configured to deploy automatically via **GitHub Actions**, which triggers whenever code is merged or pushed to the `main` branch.

## TODO:

- [ ] Fill in the pages for `artists`(list of club artists and their art and socials), `contact` (different socials, mailing list signup, discord), `events` (calendar embed and scheduled monthly events), and `gallery` (photos from events)
- [x] Add in transitions for loading in images, especially hero
- [x] Calendar embed
- [x] Create a rich embed for the website previews 
- [ ] Optimize/compress/reogranize the images
- [x] 404 page
- [x] Gallery page 
- [x] Gallery optimization for mobile/data saving (possibility of creating optimized thumbnails at build time)
- [x] Refactor gallery to sort by date instead of folder name
- [ ] Add video support ?
- [x] Merch/rewards page
- [ ] Artists page (copy gallery)
- [ ] ? Refactor file locations? ? ? small change but will check for what the convention is