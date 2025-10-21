import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowDownNarrowWide, ArrowUpNarrowWide, PlusCircle } from 'lucide-react';
import QuizesTable from './QuizesTable';

export default function Quizes() {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // ✅ Sorting options relevant to quizzes
    const sortOptions = [
        { value: 'title', label: 'Title' },
        { value: 'createdAt', label: 'Created At' },
        { value: 'updatedAt', label: 'Updated At' },
        { value: 'isPublished', label: 'Status' },
        { value: 'questionsCount', label: 'No. of Questions' },
    ];

    const handleSearch = () => setQuery(search);
    const handleSort = (value: string) => setSort(value);
    const handleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    const handleCreateQuiz = () => {
        // Add your logic to navigate to a create quiz page or open a modal
        console.log('Navigate to create quiz page');
    };

    return (
        <div className="p-4">
            <header className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold">Quizzes</h1>
                <div className="flex flex-wrap items-center gap-2">
                    {/* Sort By Dropdown */}
                    <Select onValueChange={handleSort} value={sort}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Sort Order Button */}
                    <Button onClick={handleSortOrder} size="icon" variant="outline">
                        {sortOrder === 'asc' ? (
                            <ArrowUpNarrowWide className="h-4 w-4" />
                        ) : (
                            <ArrowDownNarrowWide className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Search Input and Button */}
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search quizzes..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            className="w-auto"
                        />
                        <Button onClick={handleSearch}>Search</Button>
                    </div>

                    {/* Create Quiz Button */}
                    <Button onClick={handleCreateQuiz}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Quiz
                    </Button>
                </div>
            </header>

            <QuizesTable searchQuery={query} sortQuery={sort} sortOrder={sortOrder} />
        </div>
    );
}
