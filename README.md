# Find your Bicycle

This Nuxt application enables you to scan the QR codes NS uses at their bike storage facilities to remember where you
stored your bike. It uses Directus as a back-end, so data is stored persistently.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about Nuxt.

This app is written in Dutch, but can be easily translated to other languages. It has a `site.webmanifest`, which
enables it to be installed as an application on most mobile devices.

## Examples

![Example of scanning page](/public/examples/camera.PNG)
![Example of homepage](/public/examples/home.jpeg)
![Example of homepage](/public/examples/history.PNG)

## Setup

Make sure to install dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# NodeJS Build (e.g.: PM2)
pnpm build

# Static build (e.g.: Cloudflare Pages)
pnpm generate
```

Local preview:

```bash
# pnpm
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
