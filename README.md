# Photo gallery

A single-page, single-column infinite-scroll feed built from the Picsum API (`https://picsum.photos/v2/list?page=N`).

- Each row displays a photo at 200px wide.
- An `IntersectionObserver` loads the next page as the user nears the bottom.
- Loading stops when the API returns an empty page.
- Each photo has a like button with a count that starts at zero.

## Run locally

```bash
npm install
npm run dev
```

## Optional development proxy

If you encounter a CORS issue, run with the bundled Vite proxy:

```bash
VITE_USE_PROXY=true npm run dev
```

The project uses React and Vite.
