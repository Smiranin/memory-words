export interface AppUser {
  username: string;
}

export interface UserAuth {
  user: AppUser | null;
  status: AuthStatus;
}

type AuthStatus = 'pending' | 'in' | 'out';
