import UserDetailClient from './UserDetailClient';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  return <UserDetailClient userId={userId} />;
}

// ✅ Fix: Static Generation for Next.js Export Mode
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return users.map((user: { id: number }) => ({
    id: user.id.toString(),
  }));
}
