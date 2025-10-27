'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Quiz } from './type';

// This is the TypeScript type for a single quiz from your API
// You should import this from where you defined your types

export const columns: ColumnDef<Quiz>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
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
        accessorKey: 'questionsCount',
        header: 'Questions',
    },
    {
        accessorKey: 'isPublished',
        header: 'Status',
        cell: ({ row }) => {
            const isPublished = row.getValue('isPublished');
            return isPublished ? (
                <Badge>Published</Badge>
            ) : (
                <Badge variant="secondary">Draft</Badge>
            );
        },
    },
    {
        accessorKey: 'timeLimitMinutes',
        header: 'Time Limit',
    },
    {
        accessorKey: 'maxAttempts',
        header: 'Max Attempts',
    },

    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'));
            return <span>{date.toLocaleDateString()}</span>;
        },
    },
    // You can add an 'actions' column here for edit/delete buttons
];
