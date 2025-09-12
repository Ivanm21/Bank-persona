import { Persona } from '../types';

export const API_ENDPOINT = 'https://ivan-m.app.n8n.cloud/webhook/56ccfe3e-feb3-4712-a9e3-b25be1d7b87a';

export const personas: Persona[] = [
  {
    id: "business-owner",
    name: "Business Owner",
    displayName: "Business Owner",
    description: "Відповіді базуються виключно на внутрішніх дослідженнях з клієнтами.",
    avatar: "/api/placeholder/80/80",
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
    avatar: "/api/placeholder/80/80",
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
    avatar: "/api/placeholder/80/80",
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
    avatar: "/api/placeholder/80/80",
    suggestions: [
      "Як часто використовуєш онлайн-платежі?",
      "Чи зручний інтерфейс банківського додатку?",
      "Які додаткові послуги потрібні?"
    ],
    color: "#ECF0EF"
  }
];

export const COLORS = {
  primary: '#00A599',
  secondary: '#2DADA4',
  text: '#284541',
  background: '#ECF0EF',
  white: '#FFFFFF',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  PERSONAS: '/personas',
  CHAT: '/chat/:personaId',
} as const;
