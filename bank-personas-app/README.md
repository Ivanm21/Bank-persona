# Bank Personas Chat Application

A modern React TypeScript application that allows users to chat with different banking personas to get insights and answers based on internal research data.

## Features

- **Login Page**: Simple authentication form with email and password validation
- **Persona Selection**: Choose from 4 different banking personas (Business Owner, Digital Nomad, Top Manager, Digital Resident)
- **Chat Interface**: Real-time messaging with persona-specific suggestions and responses
- **API Integration**: Connects to webhook endpoint for persona responses
- **Responsive Design**: Mobile-first design that works on all devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Login/           # Login form components
│   ├── PersonaSelection/ # Persona selection components
│   ├── Chat/            # Chat interface components
│   └── common/          # Shared components (Header, etc.)
├── pages/               # Main page components
├── services/            # API service layer
├── types/               # TypeScript type definitions
├── utils/               # Constants and utilities
└── App.tsx              # Main application component
```

## API Integration

The application integrates with the webhook endpoint:
```
POST https://ivan-m.app.n8n.cloud/webhook/56ccfe3e-feb3-4712-a9e3-b25be1d7b87a
```

Request format:
```json
{
  "persona": "Business Owner",
  "message": "User's message text"
}
```

## Personas

1. **Business Owner** - For business banking insights
2. **Digital Nomad** - For mobile and remote banking needs
3. **Top Manager** - For premium banking services
4. **Digital Resident** - For online banking features

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Deployment

The application can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Make sure to set environment variables for the API endpoint if needed.