// hooks/useSession.ts
import { useContext } from 'react';
import { AuthenticationContext } from '../context/authenticationProvider';

export function useSession() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error('useSession must be used within an AuthenticationProvider');
  }

  return context;
}