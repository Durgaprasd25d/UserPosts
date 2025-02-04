import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import type { User } from '@/lib/store/usersSlice';

export const useUsers = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const searchTerm = useSelector((state: RootState) => state.users.searchTerm);
  const sortBy = useSelector((state: RootState) => state.users.sortBy);

  const filteredAndSortedUsers = users
    .filter((user: User) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    })
    .sort((a: User, b: User) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.company.name.localeCompare(b.company.name);
    });

  return filteredAndSortedUsers;
};