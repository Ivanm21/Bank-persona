export interface Persona {
  id: string;
  name: string;
  displayName: string;
  description: string;
  avatar: string;
  suggestions: string[];
  color: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  persona?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface WebhookRequest {
  persona: string;
  message: string;
  chatSessionId?: string;
  userId?: string;
}
