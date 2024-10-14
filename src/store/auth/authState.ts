export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  onLoginSuccess: (userId: string) => void;
  onLogout: () => void;
}
