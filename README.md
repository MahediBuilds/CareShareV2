
# CareShare - Community Sharing Platform

CareShare is a community-driven platform that connects neighbors to share resources, offer help, and build stronger communities.

## Features

- **Food Sharing**: Share leftover food with neighbors
- **Clothing Donations**: Give away clothes you no longer need
- **Help Offers**: Offer assistance with various tasks
- **Errand Requests**: Ask for help with errands and tasks
- **Community Dashboard**: View and filter community posts
- **User Profiles**: Manage your contributions and requests

## Technologies Used

This project is built with:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn-ui components
- **Mobile**: Capacitor for native mobile apps
- **Backend**: Supabase for authentication and database
- **State Management**: React Context API with Tanstack Query

## Development Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd careshare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Mobile Development

### Android

1. Add Android platform:
```bash
npx cap add android
```

2. Build the web assets:
```bash
npm run build
```

3. Sync with Capacitor:
```bash
npx cap sync
```

4. Open in Android Studio:
```bash
npx cap open android
```

### iOS

1. Add iOS platform:
```bash
npx cap add ios
```

2. Build the web assets:
```bash
npm run build
```

3. Sync with Capacitor:
```bash
npx cap sync
```

4. Open in Xcode:
```bash
npx cap open ios
```

## Environment Variables

Create a `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility functions and constants
├── pages/              # Application pages/routes
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
