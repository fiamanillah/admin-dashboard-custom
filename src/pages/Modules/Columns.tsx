import type { ColumnDef } from '@tanstack/react-table';
import type { TModule } from './type';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router';
import EditModule from './EditModule';

export const columns: ColumnDef<TModule>[] = [
    {
        id: 'title',
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => {
            return <EditModule item={row.original} trigger={<span>{row.original.title}</span>} />;
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.original.description || '—';

            if (description.length <= 50) {
                return <p className="whitespace-pre-wrap text-sm">{description}</p>;
            }
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-auto justify-start text-left text-sm p-2"
                        >
                            <p className="text-sm flex items-center gap-2">
                                {description.length > 50
                                    ? description.slice(0, 30) + '...'
                                    : description}
                                <ChevronDown size={16} />
                            </p>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className=" p-4" align="start">
                        <ScrollArea className="max-h-[60vh]">
                            <p className="whitespace-pre-wrap text-sm">{description}</p>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            );
        },
    },
    {
        accessorKey: 'isPublished',
        header: 'Status',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="font-medium leading-none">
                        {row.original.isPublished ? 'Published' : 'Unpublished'}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'estimatedDurationMinutes',
        header: 'Duration',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="font-medium leading-none">
                        {row.original.estimatedDurationMinutes} minutes
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <div className="font-medium leading-none">
                        {formatDate(row.original.createdAt)}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'lessons',
        header: 'Lessons',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Link to={`${row.original.id}/lessons`}>
                        <div className="font-medium leading-none">
                            {row.original.lessons.length}
                        </div>
                    </Link>
                </div>
            );
        },
    },
];
