// presentation/providers/AuthenticationProvider.tsx
import React from 'react';
import { useSessionViewModel } from '../viewmodels/sessionViewModel';
import { AuthContextProps } from '@/src/Domain/entities/authentication';

export const AuthenticationContext = React.createContext<AuthContextProps>({
  signIn: async () => Promise.resolve(),
  signOut: () => null,
  session: null,
  userType: null,
  isLoading: false,
});

export function AuthenticationProvider(props: React.PropsWithChildren) {
  const sessionViewModel = useSessionViewModel();

  return (
    <AuthenticationContext.Provider value={sessionViewModel}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}