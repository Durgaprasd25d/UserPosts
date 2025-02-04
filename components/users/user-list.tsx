'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { fetchUsers, setSelectedUserId } from '@/lib/store/usersSlice';
import { fetchPostsByUserId } from '@/lib/store/postsSlice';
import { useUsers } from '@/lib/hooks/useUsers';
import { UserCard } from './user-card';
import { Loader } from '@/components/ui/loader';
import { ErrorMessage } from '@/components/ui/error-message';

export function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);
  const selectedUserId = useSelector(
    (state: RootState) => state.users.selectedUserId
  );
  const users = useUsers();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleUserClick = (userId: number) => {
    dispatch(setSelectedUserId(userId));
    dispatch(fetchPostsByUserId(userId));
  };

  const handleRetry = () => {
    dispatch(fetchUsers());
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load users'} onRetry={handleRetry} />;
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => handleUserClick(user.id)}
          isSelected={user.id === selectedUserId}
        />
      ))}
    </div>
  );
}