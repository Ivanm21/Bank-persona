import { supabase } from '../lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

class AuthService {
  async signIn(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    return {
      user: data.user as AuthUser | null,
      error,
    };
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  async getCurrentUser(): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    const { data: { user }, error } = await supabase.auth.getUser();
    return {
      user: user as AuthUser | null,
      error,
    };
  }

  async getSession(): Promise<{ session: Session | null; error: AuthError | null }> {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();
