import { ReactNode } from 'react';
import UserContext from '@/contexts/UserContext';
import { data } from '@/mocks/handlers/getUsers';
import { User } from '../utils/types';

const mockData = {
  isLoading: false,
  updateUser: () => {},
  fetchUser: () => {},
  user: data as unknown as User,
};

export const renderWithUserDataMocked = (children: ReactNode) => (
  <UserContext.Provider value={mockData}>{children}</UserContext.Provider>
);
