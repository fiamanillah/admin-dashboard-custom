import type { ColumnDef } from '@tanstack/react-table';
import type { TCourse } from './type';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';

export const columns: ColumnDef<TCourse>[] = [
    {
        id: 'thumbnailUrl',
        header: 'Thumbnail',
        cell: ({ row }) => {
            const thumbnail = row.original.thumbnailUrl;
            return (
                <div className="aspect-video h-20 w-32 overflow-hidden rounded-lg border">
                    <img
                        src={thumbnail || 'https://placehold.co/300x200?text=No+Image'}
                        alt={row.original.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
            <p className="font-medium whitespace-pre-wrap truncate w-60 ">
                {row.original.title.trim()}
            </p>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
            <ScrollArea className="h-20 w-60 rounded-md border p-2">
                <p className="text-sm whitespace-pre-wrap">{row.original.description || '—'}</p>
            </ScrollArea>
        ),
    },
    {
        accessorKey: 'difficultyLevel',
        header: 'Level',
        cell: ({ row }) => {
            const level = row.original.difficultyLevel;
            const color =
                level === 'beginner'
                    ? 'bg-green-500'
                    : level === 'intermediate'
                      ? 'bg-yellow-500'
                      : 'bg-red-500';
            return <Badge className={`${color} text-white capitalize`}>{level}</Badge>;
        },
    },
    {
        accessorKey: 'estimatedDurationHours',
        header: 'Duration',
        cell: ({ row }) => <span>{row.original.estimatedDurationHours ?? '—'} hrs</span>,
    },
    {
        accessorKey: 'basePrice',
        header: 'Price',
        cell: ({ row }) => {
            const { basePrice, discountedPrice } = row.original;

            return (
                <div className="flex flex-col">
                    <span className="font-semibold">${discountedPrice}</span>
                    {discountedPrice ? (
                        <span className="text-xs line-through text-muted-foreground">
                            ${basePrice}
                        </span>
                    ) : null}
                </div>
            );
        },
    },
    {
        accessorKey: 'isPublished',
        header: 'Status',
        cell: ({ row }) =>
            row.original.isPublished ? (
                <Badge className="bg-blue-500 text-white">Published</Badge>
            ) : (
                <Badge variant="outline">Draft</Badge>
            ),
    },
    {
        accessorKey: 'modules',
        header: 'Modules',
        cell: ({ row }) => {
            const modules = row.original.modules ?? [];
            const courseId = row.original.id;

            return (
                <Link to={`/dashboard/courses/${courseId}/modules`}>
                    <Button variant="link" className="p-0 h-auto font-medium">
                        {modules.length} {modules.length === 1 ? 'Module' : 'Modules'}
                    </Button>
                </Link>
            );
        },
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
            const course = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log('View', course.id)}>
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit', course.id)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => console.log('Delete', course.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
