'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { fetchPostsByUserId } from '@/lib/store/postsSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { ErrorMessage } from '@/components/ui/error-message';

const POSTS_PER_PAGE = 3;

export function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector((state: RootState) => state.posts);
  const selectedUserId = useSelector(
    (state: RootState) => state.users.selectedUserId
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleRetry = () => {
    if (selectedUserId) {
      dispatch(fetchPostsByUserId(selectedUserId));
    }
  };

  if (!selectedUserId) {
    return (
      <Card className="glass-card overflow-hidden">
        <div className="relative p-8 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent" />
          <p className="text-muted-foreground">Select a user to view their posts</p>
        </div>
      </Card>
    );
  }

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load posts'} onRetry={handleRetry} />;
  }

  if (posts.length === 0) {
    return (
      <Card className="glass-card overflow-hidden">
        <div className="relative p-8 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent" />
          <p className="text-muted-foreground">No posts found for this user</p>
        </div>
      </Card>
    );
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <div key={post.id} className="gradient-border">
            <Card className="glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-gradient">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 md:line-clamp-none">
                  {post.body}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="glass-card hover:bg-primary/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="glass-card hover:bg-primary/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}