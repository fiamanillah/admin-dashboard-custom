'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

// This is the TypeScript type for a single quiz from your API
// You should import this from where you defined your types
export interface Quiz {
    id: string;
    title: string;
    questionsCount: number;
    isPublished: boolean;
    createdAt: string;
    // ... add other properties you need to display
}

export const columns: ColumnDef<Quiz>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
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
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'));
            return <span>{date.toLocaleDateString()}</span>;
        },
    },
    // You can add an 'actions' column here for edit/delete buttons
];
