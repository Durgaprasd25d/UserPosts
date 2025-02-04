'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
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
import { Loader } from '@/components/ui/loader';
import { ErrorMessage } from '@/components/ui/error-message';

const POSTS_PER_PAGE = 5;

export function UserDetailPosts({ userId }: { userId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector((state: RootState) => state.posts);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);

  const loadMorePosts = useCallback(() => {
    if (visiblePosts < posts.length && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, posts.length));
        setIsLoading(false);
      }, 500);
    }
  }, [posts.length, visiblePosts, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMorePosts]);

  const handleRetry = () => {
    dispatch(fetchPostsByUserId(userId));
  };

  if (status === 'loading' && posts.length === 0) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load posts'} onRetry={handleRetry} />;
  }

  if (posts.length === 0) {
    return (
      <Card className="glass-card mx-auto max-w-3xl p-8 shadow-lg rounded-xl">
        <div className="relative text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
          <p className="text-muted-foreground text-lg">No posts found for this user</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold text-gradient text-center">User Posts</h2>

      <div className="space-y-6">
        {posts.slice(0, visiblePosts).map((post) => (
          <div key={post.id} className="gradient-border">
            <Card className="glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-lg p-6">
              <CardHeader>
                <CardTitle className="text-gradient text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{post.body}</CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div ref={observerTarget} className="flex justify-center py-10">
          <Loader />
        </div>
      )}
    </div>
  );
}
