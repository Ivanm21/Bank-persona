import axios from 'axios';
import type { WebhookRequest, ApiResponse } from '../types';
import { API_ENDPOINT } from '../utils/constants';

const personaMapping: Record<string, string> = {
  'top-manager': 'ТОП',
  'business-owner': 'КБС',
  'digital-resident': 'ТОП',
  'digital-nomad': 'КБС'
};

class ApiService {
  private baseURL = API_ENDPOINT;

  async sendMessage(request: WebhookRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post(this.baseURL, request, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('API Error:', error);
      
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'Network error occurred',
        };
      }

      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }

  async sendMessageToChat(personaId: string, message: string) {
    const response = await axios.post('/api/webhook/56ccfe3e-feb3-4712-a9e3-b25be1d7b87a', {
      persona: personaMapping[personaId],
      message
    });
    return response.data;
  }
}

export const apiService = new ApiService();
