# 30 Day Reset

A lightweight, mobile-first 30-day habit tracker built with semantic HTML, CSS, and vanilla JavaScript. It tracks skincare, exercise, sleep, grooming, and hydration with automatic LocalStorage persistence.

## Run locally

Open `index.html` in a browser, or serve the folder with any static server. Tests require Node 18+:

```bash
node tests.mjs
```

## Deployment

This project is designed for GitHub Pages. Enable Pages in the repository settings with the `main` branch and root folder selected.

## Implementation notes

- The tracker anchors its 30-day calendar to the first saved start date.
- Future days are displayed but cannot be marked complete because only today has interactive controls.
- Storage failures are caught so the UI remains usable if browser storage is unavailable.
