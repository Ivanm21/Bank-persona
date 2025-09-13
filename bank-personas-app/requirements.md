# Bank Personas Chat Application - Requirements

## Project Overview
A modern web application that allows users to chat with different banking personas to get insights and answers based on internal research data.

## Design Reference
Figma Design: https://www.figma.com/design/luLZvh52AOIjEs3DBljez8/Bank-Agent?node-id=0-1&m=dev&t=tDhqoiLOZYd3RDln-1

## Technical Stack
- **Framework**: React with TypeScript (recommended) or Vue.js
- **Styling**: Tailwind CSS or styled-components
- **State Management**: React Context/Redux or Vuex (if needed)
- **HTTP Client**: Axios or Fetch API
- **Build Tool**: Vite or Create React App

## Application Flow

### 1. Login Page
- **URL**: `/login`
- **Components**: 
  - Header with "PIVDENNY INSIGHTS AGENT" logo
  - Login form with email and password fields
  - Submit button labeled "Увійти" (Login)
- **Validation**: Basic email format validation
- **Authentication**: Simple form submission (no backend auth required for MVP)

### 2. Persona Selection Page
- **URL**: `/personas`
- **Components**:
  - Header with logo
  - Title: "Оберіть персону" (Choose Persona)
  - 4 persona cards in 2x2 grid layout:
    1. **Business Owner** (Business Owner)
    2. **Digital Nomad** (Digital Nomad) 
    3. **Top Manager** (Top Manager)
    4. **Digital Resident** (Digital Resident)
- **Interaction**: Click on persona card to navigate to chat

### 3. Chat Interface
- **URL**: `/chat/:personaId`
- **Components**:
  - Header with logo
  - Back button: "назад до персон" (back to personas)
  - Persona header with avatar and description
  - Suggested questions (3 clickable suggestions)
  - Chat messages area
  - Input field with send button
- **Features**:
  - Real-time message display
  - Auto-scroll to latest message
  - Loading states for API calls

## API Integration

### Endpoint
```
POST https://ivan-m.app.n8n.cloud/webhook/56ccfe3e-feb3-4712-a9e3-b25be1d7b87a
```

### Request Format
```json
{
  "persona": "Business Owner",
  "message": "User's message text"
}
```

### Response Handling
- Handle success responses
- Display error messages for failed requests
- Show loading indicators during API calls

## Persona Configuration

### Persona Data Structure
```typescript
interface Persona {
  id: string;
  name: string;
  displayName: string;
  description: string;
  avatar: string;
  suggestions: string[];
  color: string;
}
```

### Persona List
```javascript
const personas = [
  {
    id: "business-owner",
    name: "Business Owner",
    displayName: "Business Owner",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    suggestions: [
      "З якими проблемами зустрічаєшся?",
      "Яких продуктів та сервісів не вистачає?",
      "У чому для тебе цінність банку Південний?"
    ],
    color: "#00A599"
  },
  {
    id: "digital-nomad",
    name: "Digital Nomad",
    displayName: "Digital Nomad",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    suggestions: [
      "Як часто використовуєш мобільний банкінг?",
      "Які функції найбільш важливі для тебе?",
      "Чи зручно керувати фінансами в дорозі?"
    ],
    color: "#2DADA4"
  },
  {
    id: "top-manager",
    name: "Top Manager",
    displayName: "Top Manager", 
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    suggestions: [
      "Вам потрібен преміум менеджер?",
      "Які інвестиційні можливості цікавлять?",
      "Як оцінюєте рівень сервісу?"
    ],
    color: "#284541"
  },
  {
    id: "digital-resident",
    name: "Digital Resident",
    displayName: "Digital Resident",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    suggestions: [
      "Як часто використовуєш онлайн-платежі?",
      "Чи зручний інтерфейс банківського додатку?",
      "Які додаткові послуги потрібні?"
    ],
    color: "#ECF0EF"
  }
];
```

## UI/UX Specifications

### Color Palette
- **Primary**: #00A599 (Teal)
- **Secondary**: #2DADA4 (Light Teal)
- **Text**: #284541 (Dark Green)
- **Background**: #ECF0EF (Light Gray)
- **White**: #FFFFFF
- **Input Background**: #FFFFFF

### Typography
- **Headers**: Forum font, 48px, 56px
- **Body Text**: IBM Plex Sans, 16px, 300 weight
- **Labels**: IBM Plex Sans, 12px, uppercase

### Layout
- **Container Width**: 1440px max-width
- **Card Spacing**: 8px gaps
- **Padding**: 16px-24px standard
- **Border Radius**: 8px for cards, 100px for avatars

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 1024px, 1440px
- Grid layout adapts to screen size

## File Structure
```
src/
├── components/
│   ├── Login/
│   ├── PersonaSelection/
│   ├── Chat/
│   └── common/
├── pages/
│   ├── LoginPage.tsx
│   ├── PersonaSelectionPage.tsx
│   └── ChatPage.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── utils/
│   └── constants.ts
└── App.tsx
```

## Implementation Priority
1. **Phase 1**: Basic routing and page structure
2. **Phase 2**: Login form and persona selection
3. **Phase 3**: Chat interface and API integration
4. **Phase 4**: Styling and responsive design
5. **Phase 5**: Error handling and loading states

## Testing Requirements
- Unit tests for components
- Integration tests for API calls
- E2E tests for user flows
- Cross-browser compatibility testing

## Deployment
- Build for production
- Deploy to static hosting (Netlify, Vercel, or similar)
- Environment variables for API endpoints
