'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { fetchUsers } from '@/lib/store/usersSlice';
import { fetchPostsByUserId } from '@/lib/store/postsSlice';
import { Loader } from '@/components/ui/loader';
import { ErrorMessage } from '@/components/ui/error-message';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Mail, MapPin, User } from 'lucide-react';
import { UserDetailPosts } from '@/components/users/user-detail-posts';

export default function UserDetailClient({ userId }: { userId: number }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { users, status: usersStatus, error: usersError } = useSelector(
    (state: RootState) => state.users
  );
  const user = users.find((u) => u.id === userId);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
    dispatch(fetchPostsByUserId(userId));
  }, [dispatch, usersStatus, userId]);

  if (usersStatus === 'loading') {
    return <Loader />;
  }

  if (usersStatus === 'failed') {
    return <ErrorMessage message={usersError || 'Failed to load user'} />;
  }

  if (!user) {
    return <ErrorMessage message="User not found" />;
  }

  return (
    <main className="min-h-screen">
      <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-[0.025]" />
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <Button
          variant="ghost"
          className="mb-8 gap-2 hover:bg-primary/10"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="relative mb-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
          <div className="glass-card rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                <div className="relative flex justify-center items-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-indigo-600">
                  <User className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="space-y-6 flex-1">
                <div>
                  <h1 className="text-3xl font-bold text-gradient mb-2">{user.name}</h1>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {user.address.street}, {user.address.suite}, {user.address.city}{' '}
                        {user.address.zipcode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{user.company.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gradient">Posts</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/25 to-transparent" />
          </div>
          <UserDetailPosts userId={userId} />
        </section>
      </div>
    </main>
  );
}
