import { useState } from 'react';
import { Input } from '@/components/ui/input';
import UsersTable from './UsersTable';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';

export default function Users() {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('createdAt'); // store sort field
    const [sortOrder, setSortOrder] = useState('asc'); // store sort order
    const handleSearch = () => {
        setQuery(search);
    };

    const handleSort = (value: string) => {
        setSort(value); // update sort state directly
    };

    const handleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // toggle sort order
    };

    return (
        <div className="p-2">
            <header className="flex items-center justify-between mb-2">
                <div>
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Select onValueChange={handleSort}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="displayName">Name</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="createdAt">Created At</SelectItem>
                            <SelectItem value="updatedAt">Updated At</SelectItem>
                            <SelectItem value="role">Role</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleSortOrder} size={'icon'} variant={'outline'}>
                        {sortOrder === 'asc' ? <ArrowUpNarrowWide /> : <ArrowDownNarrowWide />}
                    </Button>
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </header>
            <UsersTable searchQuery={query} sortQuery={sort} sortOrder={sortOrder} />
        </div>
    );
}
