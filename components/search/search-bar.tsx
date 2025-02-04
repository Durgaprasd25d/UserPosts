'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setSearchTerm, setSortBy } from '@/lib/store/usersSlice';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.users.searchTerm);
  const sortBy = useSelector((state: RootState) => state.users.sortBy);

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-xl" />
      <div className="glass-card rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="pl-9 bg-background/50"
            />
          </div>
          <Select
            value={sortBy}
            onValueChange={(value: 'name' | 'company') =>
              dispatch(setSortBy(value))
            }
          >
            <SelectTrigger className="w-full md:w-[180px] bg-background/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="company">Sort by Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}