import { SearchBar } from '@/components/search/search-bar';
import { UserList } from '@/components/users/user-list';
import { PostList } from '@/components/posts/post-list';
import { Users } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-[0.025]" />
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <header className="relative mb-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
              <div className="relative inline-flex justify-center items-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-indigo-600 shadow-lg shadow-primary/25">
                <Users className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Users & Posts Dashboard
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Explore user profiles and their posts in this beautifully designed dashboard.
              Search, sort, and discover content with our modern interface.
            </p>
          </div>
          <div className="mt-8 max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <section className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-gradient">Users</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/25 to-transparent" />
            </div>
            <UserList />
          </section>
          <section className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-gradient">Posts</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/25 to-transparent" />
            </div>
            <PostList />
          </section>
        </div>
      </div>
    </main>
  );
}