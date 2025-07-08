# CareShare – Community Sharing Platform

CareShare is a platform designed to help neighbors share resources, request assistance, and support each other locally.

## Features

- Food sharing
- Clothing donations
- Help offers
- Errand requests
- Community dashboard with filters
- User profiles to track contributions and requests

## Technologies Used

- **Frontend**: React 18 + TypeScript
- **Build tool**: Vite
- **Styling**: Tailwind CSS and shadcn-ui components
- **Mobile**: Capacitor for Android app
- **Backend**: Supabase (authentication and database)
- **State management**: React Context API + Tanstack Query

## Getting Started

### Prerequisites

- Node.js v16 or later
- npm or yarn

### Installation

```bash
git clone <your-repository-url>
cd careshare
npm install
npm run dev
```

The app runs at `http://localhost:8080`

## Mobile Setup (Android)

```bash
npx cap add android
npm run build
npx cap sync
npx cap open android
```

## Project Structure

```
src/
├── components/        # UI components
├── contexts/          # React context providers
├── hooks/             # Custom hooks
├── integrations/      # External services
├── lib/               # Utilities and constants
├── pages/             # App pages and routes
└── main.tsx           # App entry point
```

## License

MIT License
