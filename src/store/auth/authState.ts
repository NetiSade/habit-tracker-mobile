export interface AuthState {
  isEmailVerified: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  setUserId: (userId: string) => void;
  onRegisterSuccess: (userId: string) => void;
  onLoginSuccess: (userId: string) => void;
  onLoginFailure: () => void;
  onLogout: () => void;
}
