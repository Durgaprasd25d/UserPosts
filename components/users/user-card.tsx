'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, Mail, MapPin } from 'lucide-react';
import type { User } from '@/lib/store/usersSlice';

interface UserCardProps {
  user: User;
  onClick: () => void;
  isSelected: boolean;
}

export function UserCard({ user, onClick, isSelected }: UserCardProps) {
  const router = useRouter();
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const address = `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`;

  const handleClick = () => {
    onClick();
    router.push(`/users/${user.id}`);
  };

  return (
    <div className={`gradient-border ${isSelected ? 'before:opacity-100' : ''}`}>
      <Card
        className={`glass-card cursor-pointer transition-all hover:scale-[1.02] ${
          isSelected ? 'shadow-lg ring-2 ring-primary' : ''
        }`}
        onClick={handleClick}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-indigo-600">
            <AvatarFallback className="text-black">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl text-gradient">
              {user.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{user.company.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}