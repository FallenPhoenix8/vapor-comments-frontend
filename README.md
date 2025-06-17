# Description

This Nuxt.js frontend application is a simple discussion board where users can create discussions, add comments, and participate. Real-time data ensures immediate visibility of user contributions.

The application uses Nuxt.js for server-side rendering and the Vue.js ecosystem. Pages are built with Vue components, and the Nuxt.js built-in support for server-side rendering.

# Technologies used

- **Nuxt.js**: a Vue.js framework for server-side rendering and static site generation
- **Pinia**: a state management library for Vue.js
- **WebSockets**: for real-time communication between the client and the server
- **Motion.js**: a JavaScript library for creating animations and gestures

# Getting started

## Required environmental variables

The following environmental variables are required:

- `API_URL`: the URL of the API server
- `VITE_API_URL`: Should be the same as `API_URL`, it'll be exposed to frontend
- `CONTACT_EMAIL`: the contact email for the application host

Example data and required format is provided in [.env.example](./.env.example)

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
