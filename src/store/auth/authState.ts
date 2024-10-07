export interface AuthState {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  onLogin: (token: string, userId: string) => void;
  onLogout: () => void;
}
