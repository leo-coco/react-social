import type { ReactNode } from 'react';
import type React from 'react';
import { useState, createContext, useContext } from 'react';
import type { IUser } from './user.type';

// Create contexts
export const UserContext = createContext<IUser | null>(null);
export const SetUserContext = createContext<React.Dispatch<React.SetStateAction<IUser | null>> | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export const useSetUser = () => {
  const context = useContext(SetUserContext);
  if (context === undefined) {
    throw new Error('useSetUser must be used within a UserProvider');
  }
  return context;
};
