export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  setUserId: (userId: string) => void;
  onLoginSuccess: (userId: string) => void;
  onLoginFailure: () => void;
  onLogout: () => void;
}
