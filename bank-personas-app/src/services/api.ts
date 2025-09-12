import axios from 'axios';
import { WebhookRequest, ApiResponse } from '../types';
import { API_ENDPOINT } from '../utils/constants';

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
}

export const apiService = new ApiService();
